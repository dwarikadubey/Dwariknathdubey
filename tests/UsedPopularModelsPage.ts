import { expect, Page } from '@playwright/test';

export class UsedPopularModelsPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('https://www.zigwheels.com/used-car');
    }

    async waitForListings() {
        await this.page.waitForSelector('a.zw-sr-headingPadding');
    }

    async getModelNames(): Promise<string[]> {
        return await this.page.$$eval(
            'a.zw-sr-headingPadding',
            (elements: Element[]) => elements
                .map((el: Element) => (el.textContent?.trim()))
                .filter((text: string | undefined): text is string => typeof text === 'string' && text.length > 0)
        );
    }

    async printModels(models: string[]) {
        if (models.length > 0) {
            models.forEach((model: string, index: number) => {
                console.log(`${index + 1}. ${model}`);
            });
        } else {
            console.log('⚠️ No models found.');
        }
    }

    async gotoHome() {
        await this.page.goto('https://www.zigwheels.com/');
    }

    async navigateToUpcomingHondaBikes() {
        await this.page.hover('a[title="New Bikes"]');
        await this.page.click('//ul[@id="main-tabs"]/li[text()="Upcoming"]');
        await this.page.locator('a[title="All Upcoming Bikes"]').click();
        await this.page.waitForSelector('input[placeholder="Search by Make or Model"]');
        await this.page.fill('input[placeholder="Search by Make or Model"]', 'Honda');
        await this.page.keyboard.press('Enter');
        await this.page.waitForSelector('h1:has-text("Upcoming Honda Bikes")');
    }

    async filterBikesUnderFourLakhs() {
        // Adjust selector as per actual filter UI
        await this.page.click('label:has-text("Below 4 Lakh")');
        await this.page.waitForTimeout(2000); // Wait for filter to apply
    }

    async getUpcomingHondaBikesAndPrices(): Promise<{ name: string, price: string }[]> {
        const names = await this.page.$$eval('.modelName', (els: Element[]) => els.map(el => el.textContent?.trim() || ''));
        const prices = await this.page.$$eval('.b.fnt-15', (els: Element[]) => els.map(el => el.textContent?.trim() || ''));
        return names.map((name, i) => ({ name, price: prices[i] || 'N/A' }));
    }

    async printBikesAndPrices(bikes: { name: string, price: string }[]) {
        if (bikes.length > 0) {
            bikes.forEach((bike, i) => {
                console.log(`${i + 1}. ${bike.name} - ${bike.price}`);
            });
        } else {
            console.log('\u26a0\ufe0f No bikes found.');
        }
    }
}
