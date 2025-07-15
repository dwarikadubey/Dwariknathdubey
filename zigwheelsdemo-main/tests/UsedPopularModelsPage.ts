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
}
