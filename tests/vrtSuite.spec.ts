import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests (VRT)', () => {
  test('Test case 01 - VRT client pages', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    await expect(page).toHaveScreenshot('login-page.png');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await expect(page).toHaveScreenshot('dashboard-page.png');

    await page.goto(`${process.env.VIEW_CLIENTS_URL}`);
    await expect(page.getByText('Clients')).toBeVisible();
    await expect(page).toHaveScreenshot('view-clients-page.png');

    await page.goto(`${process.env.CREATE_CLIENTS_URL}`);
    await expect(page.getByText('New Client')).toBeVisible();
    await expect(page).toHaveScreenshot('create-client-page.png');

    await page.goto(`${process.env.EDIT_CLIENTS_URL}`);
    await expect(page.getByText('Client:')).toBeVisible();
    await expect(page).toHaveScreenshot('edit-client-page.png');
 
    //Client -> view, create, update
    await page.waitForTimeout(2000);
  });
});