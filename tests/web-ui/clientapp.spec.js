const { test } = require("@playwright/test");
const LoginPage = require("../../pageobjects/loginpage");
const LandingPage = require("../../pageobjects/landingpage");
const CartPage = require("../../pageobjects/cartpage");
const OrderPage = require("../../pageobjects/orderpage");
const dataset = JSON.parse(JSON.stringify(require("../../utils/testdata.json")));

for (const data of dataset) {
   test(`client app test for ${data.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigateToApp();
      await loginPage.loginToApplication(data.username, data.password);
      await loginPage.clickonLogin();
      const landingPage = new LandingPage(page);
      await landingPage.clientlandingPage();
      const cartPage = new CartPage(page);
      await cartPage.navigateToCart();
      await cartPage.clickOnCheckout();
      await cartPage.personalInfo();
      const orderPage = new OrderPage(page);
      await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
      const dropdown = page.locator(".ta-results");
      await dropdown.waitFor();
      const options = await page.locator("button.ta-item.list-group-item.ng-star-inserted").count();
      for (let i = 0; i < options; i++) {

         const text = await page.locator("button.ta-item.list-group-item.ng-star-inserted").nth(i).textContent();

         if (text === " India") {
            await page.locator("button.ta-item.list-group-item.ng-star-inserted").nth(i).click();
            break;
         }

      }

      await orderPage.confirmationScreen();


      await page.pause();

   })
}