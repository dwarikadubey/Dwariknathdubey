import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

export class CustomWorld extends World {
    browser!: Browser;
    page!: Page;
    models: string[] = [];
    hondaPage: any;
    bikes: any[] = [];

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init() {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
    }

    async close() {
        await this.page.close();
        await this.browser.close();
    }
}

setWorldConstructor(CustomWorld);
