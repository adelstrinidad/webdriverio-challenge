

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputSearch() {
        return $('input[name="q"]');
    }

    get btnSubmit() {
        return $('input[type="submit"]');
    }
    get searchResult() {
        return $$(`div[data-async-context="query:selenium"] > div`)
    }

    /**
     * 
     * @param {string} searchCriteria Is the criteria for what the user wants to look
     */
    async searchPage(searchCriteria) {
        await this.inputSearch.setValue(searchCriteria);
        await this.btnSubmit.click();
    }
    /**
     * 
     * @param {number} resultPosition The index of the result that the user wants to see
     */
    async openResultInNewTab(resultPosition) {
        const searchLink = this.searchResult[resultPosition].$("a[href]")
        const linkText = await searchLink.getAttribute('href')

        await browser.newWindow(linkText)
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open();
    }
}

module.exports = new HomePage();
