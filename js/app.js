import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');
const dashboard = document.getElementById('dashboard');
const userNameDisplay = document.getElementById('user-name');
const userDetails = document.getElementById('user-details');
const logoutButton = document.getElementById('logout-button');
const goWelcomeButton = document.getElementById('go-welcome-button');

// ─── Helpers de UI ───────────────────────────────────────────────────────────

function showMessage(element, message, isError = true) {
  element.textContent = message;
  element.style.color = isError ? '#f8c9d3' : '#b7f2c6';
}

function toggleAuthView(showLogin) {
  btnLogin.classList.toggle('active', showLogin);
  btnRegister.classList.toggle('active', !showLogin);
  loginForm.classList.toggle('active', showLogin);
  registerForm.classList.toggle('active', !showLogin);
  loginMessage.textContent = '';
  registerMessage.textContent = '';
}

function showDashboard(user) {
  document.querySelector('.auth-panel').classList.add('hidden');
  dashboard.classList.remove('hidden');
  userNameDisplay.textContent = user.name;
  userDetails.textContent = `${user.career} · Semestre ${user.semester}`;
}

function showAuthPanel() {
  document.querySelector('.auth-panel').classList.remove('hidden');
  dashboard.classList.add('hidden');
}

// ─── Registro ────────────────────────────────────────────────────────────────

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim().toLowerCase();
  const career = document.getElementById('register-career').value.trim();
  const semester = document.getElementById('register-semester').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  if (!name || !email || !career || !semester || !password || !confirmPassword) {
    showMessage(registerMessage, 'Todos los campos son obligatorios.');
    return;
  }
  if (password.length < 6) {
    showMessage(registerMessage, 'La contraseña debe tener al menos 6 caracteres.');
    return;
  }
  if (password !== confirmPassword) {
    showMessage(registerMessage, 'Las contraseñas no coinciden.');
    return;
  }

  try {
    // 1. Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 2. Guardar datos extra en Firestore
    await setDoc(doc(db, 'usuarios', uid), {
      name,
      email,
      career,
      semester
    });

    showMessage(registerMessage, 'Registro exitoso. Bienvenido.', false);
    showDashboard({ name, career, semester });

  } catch (error) {
    const mensajes = {
      'auth/email-already-in-use': 'Ya existe una cuenta con este correo.',
      'auth/invalid-email': 'El correo no es válido.',
      'auth/weak-password': 'La contraseña es demasiado débil.'
    };
    showMessage(registerMessage, mensajes[error.code] || 'Error al registrar. Intenta de nuevo.');
  }
});

// ─── Login ───────────────────────────────────────────────────────────────────

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showMessage(loginMessage, 'Por favor ingresa correo y contraseña.');
    return;
  }

  try {
    // 1. Autenticar con Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 2. Obtener datos extra desde Firestore
    const userDoc = await getDoc(doc(db, 'usuarios', uid));
    const userData = userDoc.data();

    showMessage(loginMessage, 'Ingreso exitoso.', false);
    showDashboard(userData);

  } catch (error) {
    const mensajes = {
      'auth/user-not-found': 'No existe una cuenta con este correo.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-credential': 'Correo o contraseña incorrectos.'
    };
    showMessage(loginMessage, mensajes[error.code] || 'Error al iniciar sesión. Intenta de nuevo.');
  }
});

// ─── Logout ──────────────────────────────────────────────────────────────────

logoutButton.addEventListener('click', async () => {
  await signOut(auth);
  showAuthPanel();
  toggleAuthView(true);
});

goWelcomeButton.addEventListener('click', () => {
  window.location.href = 'welcome.html';
});

// ─── Tabs ─────────────────────────────────────────────────────────────────────

btnLogin.addEventListener('click', () => toggleAuthView(true));
btnRegister.addEventListener('click', () => toggleAuthView(false));

// ─── Sesión persistente (Firebase la maneja automáticamente) ─────────────────

onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const userDoc = await getDoc(doc(db, 'usuarios', firebaseUser.uid));
    if (userDoc.exists()) {
      showDashboard(userDoc.data());
    }
  } else {
    showAuthPanel();
  }
});
