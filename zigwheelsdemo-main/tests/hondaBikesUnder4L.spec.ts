import { test, expect } from '@playwright/test';

test('Print upcoming Honda bikes under ₹4 Lakhs on ZigWheels', async ({ page }) => {
  await page.goto('https://www.zigwheels.com');

  // Accept cookie popup if visible
  const cookieBtn = page.locator('button:has-text("Allow All")');
  if (await cookieBtn.isVisible()) {
    await cookieBtn.click();
  }

  // Navigate to Honda upcoming bikes
  await page.locator('a[title="New Bikes"]').click();
  await page.locator('//ul[@id="main-tabs"]/li[text()="Upcoming"]').click();
  await page.locator('a[title="All Upcoming Bikes"]').click();

  const hondaLink = page.locator('a[data-track-label="filter-by-brand"]', { hasText: 'Honda' });
  await hondaLink.scrollIntoViewIfNeeded();
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    hondaLink.click()
  ]);

await page.waitForSelector('ul#modelList li');

 //const ExpectedLaunchDate= await page.locator('//div[text()="Expected Launch : Oct 2025"]').nth(3);

 //console.log(await ExpectedLaunchDate.textContent());

  
  const bikeCards = await page.$$('ul#modelList li');
  const bikes: { name: string; price: number; raw: string }[] = [];

  for (const card of bikeCards) {
    const nameHandle = await card.$('strong');
    const priceHandle = await card.$('div.b.fnt-15');

    const name = nameHandle ? (await nameHandle.textContent())?.trim() : null;
    const priceText = priceHandle ? (await priceHandle.textContent()) : null;

    let priceInINR = 0;

    if (priceText?.includes('Lakh')) {
      const matchLakh = priceText.match(/Rs\.?\s*([\d.]+)\s*Lakh/);
      if (matchLakh && matchLakh[1]) {
        priceInINR = parseFloat(matchLakh[1]) * 100000;
      }
    } else {
      const matchNumber = priceText?.match(/Rs\.?\s*([\d,]+)/);
      if (matchNumber && matchNumber[1]) {
        priceInINR = parseInt(matchNumber[1].replace(/,/g, ''));
      }
    }

    if (priceInINR > 0 && priceInINR <= 400000) {
      bikes.push({ name: name || 'N/A', price: priceInINR, raw: priceText?.trim() || '' });
    }
  }

  // Output to terminal
  console.log('🏍️ Upcoming Honda Bikes Under ₹4 Lakhs:');
  if (bikes.length === 0) {
    console.log('⚠️ No upcoming Honda bikes found under ₹4 Lakhs.');
  } else {
    bikes.forEach((bike, index) => {
      console.log(`${index + 1}. ${bike.name} - ${bike.raw}`);
       
    });
  }
});
