import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';

setDefaultTimeout(60 * 1000); // 60 seconds

Before(async function (this: CustomWorld) {
    await this.init();
});

After(async function (this: CustomWorld) {
    await this.close();
});

Given('I am on the ZigWheels used car page', async function (this: CustomWorld) {
    await this.page.goto('https://www.zigwheels.com/used-car');
});

When('I wait for the listings to appear', async function (this: CustomWorld) {
    await this.page.waitForSelector('a.zw-sr-headingPadding');
});

Then(/I should see a list of popular used bike\/car models in Chennai/, async function (this: CustomWorld) {
    const models = await this.page.$$eval(
        'a.zw-sr-headingPadding',
        (elements: any[]) => elements.map((el: any) => el.textContent?.trim()).filter((text: string | undefined): text is string => typeof text === 'string' && text.length > 0)
    );
    this.models = models;
    expect(models.length).toBeGreaterThan(0);
});

Then('I print each model name to the console', async function (this: CustomWorld) {
    if (this.models && this.models.length > 0) {
        this.models.forEach((model: string, index: number) => {
            console.log(`${index + 1}. ${model}`);
        });
    }
});

Then('If no models are found, I print a warning message', async function (this: CustomWorld) {
    if (!this.models || this.models.length === 0) {
        console.log('⚠️ No models found.');
    }
});

// Steps for: Print upcoming Honda bikes under Four Lakhs on ZigWheels
Given('I am on the ZigWheels homepage', async function (this: CustomWorld) {
    await this.page.goto('https://www.zigwheels.com/');
});

When('I navigate to the Upcoming Honda bikes section', async function (this: CustomWorld) {
    await this.page.waitForTimeout(5000);
    await this.page.locator('a[title="New Bikes"]').click();
    await this.page.waitForTimeout(5000); // Wait for 2 seconds to allow the page and tabs to load
    await this.page.locator('//ul[@id="main-tabs"]/li[text()="Upcoming"]').click();
    await this.page.locator('a[title="All Upcoming Bikes"]').click();
    const hondaLink = this.page.locator('a[data-track-label="filter-by-brand"]', { hasText: 'Honda' });
    await hondaLink.scrollIntoViewIfNeeded();
    await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load' }),
        hondaLink.click()
    ]);

});

When('I filter bikes under Four Lakhs', async function (this: CustomWorld) {
    // Adjust selector as per actual filter UI
    await this.page.click('label:has-text("Below 4 Lakh")');
    await this.page.waitForTimeout(2000); // Wait for filter to apply
});

Then('I should see a list of upcoming Honda bikes under Four Lakhs', async function (this: CustomWorld) {
    this.bikes = await this.page.$$eval(
        '.modelName',
        (elements: any[]) => elements.map((el: any) => el.textContent?.trim()).filter((text: string | undefined): text is string => typeof text === 'string' && text.length > 0)
    );
    expect(this.bikes.length).toBeGreaterThan(0);
});

Then('I print each bike name and price to the console', async function (this: CustomWorld) {
    const bikes = await this.page.$$('.modelName');
    const prices = await this.page.$$('.b.fnt-15');
    if (bikes.length > 0) {
        for (let i = 0; i < bikes.length; i++) {
            const name = await bikes[i].textContent();
            const price = prices[i] ? await prices[i].textContent() : 'N/A';
            console.log(`${i + 1}. ${name?.trim()} - ${price?.trim()}`);
        }
    }
});

Then('If no bikes are found  I print a warning message', async function (this: CustomWorld) {
    if (!this.bikes || this.bikes.length === 0) {
        console.log('⚠️ No bikes found.');
    }
});
