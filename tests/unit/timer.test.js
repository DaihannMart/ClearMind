// tests/unit/timer.test.js

// Clase PomodoroTimer
class PomodoroTimer {
  constructor() {
    this.timeLeft = 25 * 60;
    this.isRunning = false;
    this.intervalId = null;
  }

  formatTime(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
  }

  start(onTick, onComplete) {
    var self = this;
    if (this.isRunning) return;
    this.isRunning = true;
    
    this.intervalId = setInterval(function() {
      if (self.timeLeft > 0) {
        self.timeLeft--;
        if (onTick) onTick(self.timeLeft);
      }
      if (self.timeLeft === 0) {
        self.stop();
        if (onComplete) onComplete();
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  reset() {
    this.stop();
    this.timeLeft = 25 * 60;
  }

  pause() {
    this.stop();
  }
}

// ==================== PRUEBAS ====================

describe('PomodoroTimer', function() {
  
  it('debe inicializar con 25 minutos (1500 segundos)', function() {
    var timer = new PomodoroTimer();
    expect(timer.timeLeft).toBe(1500);
  });

  it('debe iniciar en estado no corriendo', function() {
    var timer = new PomodoroTimer();
    expect(timer.isRunning).toBe(false);
  });

  it('formatTime debe convertir 1500 segundos a "25:00"', function() {
    var timer = new PomodoroTimer();
    expect(timer.formatTime(1500)).toBe('25:00');
  });

  it('formatTime debe convertir 65 segundos a "01:05"', function() {
    var timer = new PomodoroTimer();
    expect(timer.formatTime(65)).toBe('01:05');
  });

  it('formatTime debe convertir 0 segundos a "00:00"', function() {
    var timer = new PomodoroTimer();
    expect(timer.formatTime(0)).toBe('00:00');
  });

  it('start debe cambiar isRunning a true', function() {
    var timer = new PomodoroTimer();
    var emptyFunction = function() {};
    timer.start(emptyFunction);
    expect(timer.isRunning).toBe(true);
    timer.stop();
  });

  it('pause debe cambiar isRunning a false', function() {
    var timer = new PomodoroTimer();
    var emptyFunction = function() {};
    timer.start(emptyFunction);
    timer.pause();
    expect(timer.isRunning).toBe(false);
  });

  it('reset debe restaurar el tiempo a 25 minutos', function() {
    var timer = new PomodoroTimer();
    timer.timeLeft = 500;
    timer.reset();
    expect(timer.timeLeft).toBe(1500);
  });

});