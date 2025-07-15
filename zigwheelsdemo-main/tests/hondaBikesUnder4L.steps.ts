import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';
import { HondaBikesUnder4LPage } from './HondaBikesUnder4LPage';
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
    await this.init();
    this.hondaPage = new HondaBikesUnder4LPage(this.page);
});

After(async function (this: CustomWorld) {
    await this.close();
});

Given('I am on the ZigWheels homepage', async function (this: CustomWorld) {
    await this.hondaPage.gotoHomePage();
    await this.hondaPage.acceptCookies();
});

When('I navigate to the Upcoming Honda bikes section', async function (this: CustomWorld) {
    await this.hondaPage.navigateToUpcomingHondaBikes();
});

When('I filter bikes under ₹4 Lakhs', async function (this: CustomWorld) {
    this.bikes = await this.hondaPage.filterBikesUnder4Lakh();
});

Then(/I should see a list of upcoming Honda bikes under ₹4 Lakhs/, async function (this: CustomWorld) {
    expect(this.bikes.length).toBeGreaterThan(0);
});

Then('I print each bike name and price to the console', async function (this: CustomWorld) {
    if (this.bikes && this.bikes.length > 0) {
        this.bikes.forEach((bike: any, index: number) => {
            console.log(`${index + 1}. ${bike.name} - ${bike.raw}`);
        });
    }
});

Then('If no bikes are found, I print a warning message', async function (this: CustomWorld) {
    if (!this.bikes || this.bikes.length === 0) {
        console.log('⚠️ No upcoming Honda bikes found under ₹4 Lakhs.');
    }
});
