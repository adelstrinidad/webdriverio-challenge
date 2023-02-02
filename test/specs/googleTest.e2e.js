const HomePage = require('../pageobjects/home.page')

describe('Google search', () => {
    it('The user can select the second result of a search', async () => {
        /**
         * 1. Run a google search for the word “selenium”
         * 2. Open the second result in new tab
         * 3. Check what text is written on the page title (text on the opened tab)
         */
        await HomePage.open()
        await HomePage.searchPage('selenium')
        await HomePage.openResultInNewTab(2)
        const title = await browser.getTitle()

        await expect(browser).toHaveTitleContaining(title)
    })
})