import { test, expect } from '@playwright/test';

test('Print used bike models in Chennai from ZigWheels', async ({ page }) => {
  await page.goto('https://www.zigwheels.com/used-car');

  // Wait for listings to appear
  await page.waitForSelector('a.zw-sr-headingPadding');

  // Extract model names
  const models = await page.$$eval(
    'a.zw-sr-headingPadding',
    elements => elements.map(el => el.textContent?.trim()).filter(Boolean)
  );

  console.log('\n🏍️ Popular Used Bike/Car Models in Chennai:');
  if (models.length > 0) {
    models.forEach((model, index) => {
      console.log(`${index + 1}. ${model}`);
    });
  } else {
    console.log('⚠️ No models found.');
  }

  await page.waitForTimeout(3000); // Just to observe before close
});
