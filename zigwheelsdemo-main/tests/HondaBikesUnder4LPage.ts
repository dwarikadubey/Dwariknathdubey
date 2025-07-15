import { Page } from 'playwright';

export class HondaBikesUnder4LPage {
    constructor(public page: Page) { }

    async gotoHomePage() {
        await this.page.goto('https://www.zigwheels.com');
    }

    async acceptCookies() {
        const cookieBtn = this.page.locator('button:has-text("Allow All")');
        if (await cookieBtn.isVisible()) {
            await cookieBtn.click();
        }
    }

    async navigateToUpcomingHondaBikes() {
        await this.page.locator('a[title="New Bikes"]').click();
        await this.page.locator('//ul[@id="main-tabs"]/li[text()="Upcoming"]').click();
        await this.page.locator('a[title="All Upcoming Bikes"]').click();
        const hondaLink = this.page.locator('a[data-track-label="filter-by-brand"]', { hasText: 'Honda' });
        await hondaLink.scrollIntoViewIfNeeded();
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            hondaLink.click()
        ]);
    }

    async filterBikesUnder4Lakh() {
        await this.page.waitForSelector('ul#modelList li');
        const bikeCards = await this.page.$$('ul#modelList li');
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
        return bikes;
    }
}
