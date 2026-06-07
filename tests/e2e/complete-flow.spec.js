import { test, expect } from '@playwright/test';

test.describe('ClearMind - Pruebas End-to-End', () => {
  
  test('E2E-01: Usuario se registra y ve el dashboard', async ({ page }) => {
    // Navegar a la aplicación
    await page.goto('http://127.0.0.1:5500/index.html');
    
    // Verificar título
    await expect(page).toHaveTitle(/ClearMind/);
    
    // Cambiar a registro
    await page.click('#btn-register');
    
    // Completar formulario
    const testEmail = `test_${Date.now()}@universidad.edu`;
    await page.fill('#register-name', 'Usuario Prueba');
    await page.fill('#register-email', testEmail);
    await page.fill('#register-career', 'Ingeniería');
    await page.fill('#register-semester', '5');
    await page.fill('#register-password', '123456');
    await page.fill('#register-confirm-password', '123456');
    
    // Enviar
    await page.click('#register-form button[type="submit"]');
    
    // Esperar dashboard
    await page.waitForSelector('#dashboard:not(.hidden)', { timeout: 10000 });
    
    // Verificar nombre
    await expect(page.locator('#user-name')).toContainText('Usuario Prueba');
  });

  test('E2E-02: Usuario inicia sesión existente', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
    
    await page.fill('#login-email', 'test@test.com');
    await page.fill('#login-password', '123456');
    await page.click('#login-form button[type="submit"]');
    
    await page.waitForSelector('#dashboard:not(.hidden)', { timeout: 10000 });
    
    await expect(page.locator('#user-name')).toBeVisible();
  });

  test('E2E-03: Usuario navega a welcome y usa temporizador', async ({ page }) => {
    // Login
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.fill('#login-email', 'test@test.com');
    await page.fill('#login-password', '123456');
    await page.click('#login-form button[type="submit"]');
    await page.waitForSelector('#dashboard:not(.hidden)');
    
    // Ir a welcome
    await page.click('#go-welcome-button');
    await page.waitForURL(/welcome.html/);
    
    // Verificar temporizador
    await expect(page.locator('#timer-minutes')).toContainText('25');
    
    // Iniciar sesión de estudio
    await page.fill('#subject-input', 'Matemáticas');
    await page.click('#start-timer');
    
    // Verificar que comenzó
    await expect(page.locator('#start-timer')).toBeDisabled();
  });
});