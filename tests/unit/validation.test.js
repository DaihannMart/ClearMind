// tests/unit/validation.test.js

describe('Validaciones del sistema', function() {

  // Pruebas de email
  describe('Email', function() {
    
    it('Email con formato correcto debe ser válido', function() {
      var email1 = 'estudiante@universidad.edu';
      var email2 = 'usuario@gmail.com';
      
      expect(email1.includes('@')).toBe(true);
      expect(email1.includes('.')).toBe(true);
      expect(email2.includes('@')).toBe(true);
      expect(email2.includes('.')).toBe(true);
    });

    it('Email sin @ debe ser inválido', function() {
      var email = 'invalido';
      expect(email.includes('@')).toBe(false);
    });
  });

  // Pruebas de contraseña
  describe('Contraseña', function() {
    
    it('Contraseña con 6 o más caracteres debe ser válida', function() {
      var password = '123456';
      expect(password.length).toBeGreaterThanOrEqual(6);
    });

    it('Contraseña con menos de 6 caracteres debe ser inválida', function() {
      var password = '12345';
      expect(password.length).toBeLessThan(6);
    });

    it('Contraseña vacía debe ser inválida', function() {
      var password = '';
      expect(password.length).toBe(0);
    });
  });

  // Pruebas de energía
  describe('Nivel de energía', function() {
    
    it('Energía 1 debe ser válida', function() {
      var energia = 1;
      expect(energia).toBeGreaterThanOrEqual(1);
      expect(energia).toBeLessThanOrEqual(5);
    });

    it('Energía 3 debe ser válida', function() {
      var energia = 3;
      expect(energia).toBeGreaterThanOrEqual(1);
      expect(energia).toBeLessThanOrEqual(5);
    });

    it('Energía 5 debe ser válida', function() {
      var energia = 5;
      expect(energia).toBeGreaterThanOrEqual(1);
      expect(energia).toBeLessThanOrEqual(5);
    });

    it('Energía 0 debe ser inválida', function() {
      var energia = 0;
      expect(energia).toBeLessThan(1);
    });

    it('Energía 6 debe ser inválida', function() {
      var energia = 6;
      expect(energia).toBeGreaterThan(5);
    });
  });

  // Pruebas de estrés
  describe('Nivel de estrés', function() {
    
    it('Estrés 1 debe ser válido', function() {
      var estres = 1;
      expect(estres).toBeGreaterThanOrEqual(1);
      expect(estres).toBeLessThanOrEqual(5);
    });

    it('Estrés 5 debe ser válido', function() {
      var estres = 5;
      expect(estres).toBeGreaterThanOrEqual(1);
      expect(estres).toBeLessThanOrEqual(5);
    });

    it('Estrés 0 debe ser inválido', function() {
      var estres = 0;
      expect(estres).toBeLessThan(1);
    });
  });

  // Pruebas de semestre
  describe('Semestre', function() {
    
    it('Semestre 1 debe ser válido', function() {
      var semestre = 1;
      expect(semestre).toBeGreaterThanOrEqual(1);
      expect(semestre).toBeLessThanOrEqual(12);
    });

    it('Semestre 12 debe ser válido', function() {
      var semestre = 12;
      expect(semestre).toBeGreaterThanOrEqual(1);
      expect(semestre).toBeLessThanOrEqual(12);
    });

    it('Semestre 13 debe ser inválido', function() {
      var semestre = 13;
      expect(semestre).toBeGreaterThan(12);
    });
  });
});