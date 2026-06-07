import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// ─── DOM Elements ─────────────────────────────────────────────────────────────

const menuButtons = document.querySelectorAll('.menu-button');
const welcomeSections = document.querySelectorAll('.welcome-section');
const userGreeting = document.getElementById('user-greeting');
const logoutWelcome = document.getElementById('logout-welcome');
const backToDashboard = document.getElementById('back-to-dashboard');

// Pomodoro
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');
const subjectInput = document.getElementById('subject-input');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const pomodoroMessage = document.getElementById('pomodoro-message');

// Wellness
const ratingBtns = document.querySelectorAll('.rating-btn');
const stressBtns = document.querySelectorAll('.stress-btn');
const energyValue = document.getElementById('energy-value');
const stressValue = document.getElementById('stress-value');
const wellnessNotes = document.getElementById('wellness-notes');
const saveWellnessBtn = document.getElementById('save-wellness');
const wellnessMessage = document.getElementById('wellness-message');

// ─── Estado ───────────────────────────────────────────────────────────────────

let currentUser = null;   // usuario de Firebase Auth
let currentUserData = {}; // datos extra de Firestore

let timerInterval = null;
let timeLeft = 25 * 60;
let isRunning = false;
let selectedEnergy = null;
let selectedStress = null;

// ─── Sesión ───────────────────────────────────────────────────────────────────

onAuthStateChanged(auth, async (firebaseUser) => {
  if (!firebaseUser) {
    window.location.href = 'index.html';
    return;
  }
  currentUser = firebaseUser;

  // Obtener datos extra del usuario desde Firestore
  const { getDoc, doc } = await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js");
  const userDoc = await getDoc(doc(db, 'usuarios', firebaseUser.uid));
  if (userDoc.exists()) {
    currentUserData = userDoc.data();
    userGreeting.textContent = `Estudiante de ${currentUserData.career} - Semestre ${currentUserData.semester}`;
  }
});

// ─── Navegación de menú ───────────────────────────────────────────────────────

menuButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    menuButtons.forEach((b) => b.classList.remove('active'));
    welcomeSections.forEach((s) => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.section).classList.add('active');
  });
});

// ─── Pomodoro ─────────────────────────────────────────────────────────────────

function updateTimerDisplay() {
  timerMinutes.textContent = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  timerSeconds.textContent = String(timeLeft % 60).padStart(2, '0');
}

function startTimer() {
  if (isRunning) return;
  if (!subjectInput.value.trim()) {
    showPomodoroMessage('Por favor ingresa el nombre de la asignatura.', true);
    return;
  }
  isRunning = true;
  startTimerBtn.disabled = true;
  pauseTimerBtn.disabled = false;
  subjectInput.disabled = true;

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      completePomodoro();
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timerInterval);
  isRunning = false;
  startTimerBtn.disabled = false;
  pauseTimerBtn.disabled = true;
  showPomodoroMessage('Sesión pausada. Presiona "Iniciar sesión" para continuar.', false);
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = 25 * 60;
  updateTimerDisplay();
  startTimerBtn.disabled = false;
  pauseTimerBtn.disabled = true;
  subjectInput.disabled = false;
  subjectInput.value = '';
  pomodoroMessage.textContent = '';
}

async function completePomodoro() {
  clearInterval(timerInterval);
  isRunning = false;
  const subject = subjectInput.value.trim();

  // Guardar sesión en Firestore
  await saveSessionToFirestore(subject);

  showPomodoroMessage(`¡Sesión completada para ${subject}! Ahora puedes registrar tu bienestar.`, false);
  startTimerBtn.disabled = false;
  pauseTimerBtn.disabled = true;
  subjectInput.disabled = false;

  setTimeout(() => resetTimer(), 3000);
}

async function saveSessionToFirestore(subject) {
  if (!currentUser) return;
  try {
    await addDoc(collection(db, 'usuarios', currentUser.uid, 'sesiones_pomodoro'), {
      subject,
      duration: 25,
      date: serverTimestamp()
    });
  } catch (error) {
    console.error('Error guardando sesión pomodoro:', error);
  }
}

function showPomodoroMessage(message, isError = true) {
  pomodoroMessage.textContent = message;
  pomodoroMessage.style.color = isError ? '#f8c9d3' : '#b7f2c6';
}

startTimerBtn.addEventListener('click', startTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);

// ─── Bienestar ────────────────────────────────────────────────────────────────

ratingBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    ratingBtns.forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedEnergy = btn.dataset.rating;
    energyValue.textContent = selectedEnergy;
  });
});

stressBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    stressBtns.forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedStress = btn.dataset.stress;
    stressValue.textContent = selectedStress;
  });
});

saveWellnessBtn.addEventListener('click', async () => {
  if (!selectedEnergy || !selectedStress) {
    showWellnessMessage('Por favor selecciona tu nivel de energía y estrés.', true);
    return;
  }
  if (!currentUser) {
    showWellnessMessage('Error: no hay sesión activa.', true);
    return;
  }

  try {
    // Guardar registro de bienestar en Firestore
    await addDoc(collection(db, 'usuarios', currentUser.uid, 'bienestar'), {
      energy: Number(selectedEnergy),
      stress: Number(selectedStress),
      notes: wellnessNotes.value.trim(),
      date: serverTimestamp()
    });

    showWellnessMessage('¡Registro guardado exitosamente!', false);

    setTimeout(() => {
      selectedEnergy = null;
      selectedStress = null;
      ratingBtns.forEach((b) => b.classList.remove('selected'));
      stressBtns.forEach((b) => b.classList.remove('selected'));
      energyValue.textContent = '-';
      stressValue.textContent = '-';
      wellnessNotes.value = '';
      wellnessMessage.textContent = '';
    }, 2000);

  } catch (error) {
    console.error('Error guardando bienestar:', error);
    showWellnessMessage('Error al guardar el registro. Intenta de nuevo.', true);
  }
});

function showWellnessMessage(message, isError = true) {
  wellnessMessage.textContent = message;
  wellnessMessage.style.color = isError ? '#f8c9d3' : '#b7f2c6';
}

// ─── Navegación ───────────────────────────────────────────────────────────────

logoutWelcome.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'index.html';
});

backToDashboard.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// ─── Init ─────────────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  updateTimerDisplay();
});
