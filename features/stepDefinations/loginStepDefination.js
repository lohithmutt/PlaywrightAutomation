const { Given, When, Then } = require('@cucumber/cucumber');
const {LoginPage} = require('../../pageobjects/loginpage');
const playwright = require("@playwright/test");

Given('I login to Ecommerce application with {string} and {string}', async function (username, password) {
   
   const browser = await playwright.chromium.launch();
   const context = await browser.newContext();
   const page = await context.newPage();
   const loginPage = new LoginPage(page);
   await loginPage.navigateToApp();
   await loginPage.loginToApplication(username,password);
});


When('I click on login button', async function () {
   const loginPage = new LoginPage(page);
   await loginPage.clickonLogin();
})