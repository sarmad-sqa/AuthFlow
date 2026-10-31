//@ts-check
import { test, expect } from '@playwright/test';

test ('Singup Page with CICD', async ({page}) => {
    await page.goto ('/');
    await expect(page.getByText('Signup Form')).toBeVisible();
    await expect(page.getByText('Username:')).toBeVisible();
    await page.getByPlaceholder('Enter your username').fill('Sarmad Sarwar');
    await expect (page.getByText('Email Address')).toBeVisible();
    await page.getByPlaceholder('Enter your email address').fill('sarmadsqa01@gmail.com');
    await expect (page.getByText('Password  ')).toBeVisible();
    await page.getByPlaceholder('Enter your password').fill('Temp123!');
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    await page.getByRole('button',{name: 'Submit'}).click();
    await expect(page.getByText('Signup submitted successfully!', { exact: true }))
    .toBeVisible({ timeout: 5000 });
});