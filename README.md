### WebdriverIO-v8 Sandbx challenge

This repository contains a solution for the code challenge proposed by Sandbx using webdriverIO (v8) and mocha.



### Installation
This project is tested on **Node v16.13.1** and above.  While earlier versions of node may be compatible, but they have not been verified.

`Node.JS:` Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally.

### Test

To run your test you must have installed the WebdriverIO test runner (`npm install @wdio/cli`)

### Run Some Sample Tests

To execute the entire test suite on local development, you can use below

Local Environment `npm test`.

For now it's not implemented running in a cloud service.

### Config Files

WebdriverIO uses configuration files to setup and execute tests in specific ways.  The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files are found in the `the root directory of this project.` `wdio.conf.js`.  These can be called via the the cli.


### Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.

##### Allure

The Allure Reporter creates [Allure](https://docs.qameta.io/allure/) test reports which is an HTML generated website with all necessary information to debug your test results and take a look on error screenshots. Add allure to the reporters array in config file and define the output directory of the allure reports.  Please note, this has been added in wdio.shared.config.

To generate and view an Allure report inside your corp network or locally, run `npm run allure-report`. The Allure report is hosted on a `web server` and can be accessed through http://YourMachineIP:5050/ and also generated locally which can be found at `./allure-report/index.html`. A typical Allure report will look like this.

![ScreenShot](https://github.com/amiya-pattnaik/snapshots/blob/master/allure-report.png)

For getting the report follow this steps'
```
1 Run a suite with npm test
2 npm run allure-report

```


##### Spec

Test reporter, that prints detailed results to console.

### Develop automation scripts (for both desktop browser and mobile browser / app)

You can write test by using Mocha framework. I decided to use JavaScript and ES6.

Refer complete [WebdriverIO v8 API](https://webdriver.io/docs/api) methods to write your automation tests.

#### Using Mocha JavaScript framework

Tests are written in the Mocha framework. More about Mocha can be found at  https://mochajs.org/

Sample tests are located in `*.specs.js` files in the `/test/specs/` directory. A typical test will look similar to this:
```
//example (pls refer to pageobject class and spec files)

//a test using async mode//

describe('Performing a search operation on Yahoo Page',  () =>  {
  it('Performing a search operation', async () =>  {
    await yahooPage.open();
    assert.equal(await browser.getTitle(), 'Yahoo Search - Web Search');
  });
});

```
### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath's etc.) up to date with the latest version of your code.  The next challenge is to keep the code you write nice and [DRY] (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  Instead of including our selectors in Spec file (in Mocha), we instead place them in a `<pagename>.ts` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When A test fails, it fails on a individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern.  This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.js`.  These will require the basic `page.js` prototype construct / abstract class and create new objects for each individual page.

For more information on the implementation of `Page Object Design Pattern`, refer to the `/test/pageobjects` directory. A typical page class using ES6 syntax will look similar to this:


```
import Page from './page';
class LoginPage extends Page {

    /**
    * define elements
    */

    get usernameInput()   { return $('//*[@name="username"]'); }
    get passwordInput()   { return $('//*[@name="password"]'); }
    get loginButton()     { return $('//button[contains(., "Login")]'); }

    /**
     * define or overwrite page methods
     */
    async open() {
        await super.open('login')       //this will append `login` to the baseUrl to form complete URL
        //browser.pause(3000);
    }
    /**
     * your page specific methods
     */

    async waitForloginPageToLoad() {
      if(!(await this.headerImage.isDisplayed())){
        await this.headerImage.waitForDisplayed(10000);
      }
    }

    async login(username, password) {
      //this.waitForloginPageToLoad();
      await this.usernameInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.loginButton.click();
    }
}

export default new LoginPage()

```

## Licensing

MIT