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
