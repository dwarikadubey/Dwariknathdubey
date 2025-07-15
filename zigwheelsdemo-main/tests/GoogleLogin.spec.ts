import { test, expect } from '@playwright/test';



test('Login with google and try to capture the error message', async ({ page }) => {
  await page.goto('https://www.zigwheels.com');

  await page.locator('#des_lIcon').click();

  await page.locator('#myModal3-modal-content > div.fo-nw-login.txt-c.d-tbl.wth-100 > div > div.fo-nw-step1 > div:nth-child(7) > div > span.fnt-14').click();

  // Wait for the Google login popup window
  let popup;
  try {
    popup = await page.waitForEvent('popup', { timeout: 15000 });
    console.log('Popup window detected');
  } catch (e) {
    console.log('No popup window detected:', e);
  }

  if (popup) {
    // Wait for the email input to appear in the popup
    const email_input = popup.getByLabel('Email or phone');
    await email_input.waitFor({ state: 'visible', timeout: 10000 });
    await email_input.fill('24242#$');
    await popup.locator('#identifierNext > div > button > span').click();
  } else {
    console.log('Google login popup did not appear.');
  }

});