const { test, expect, request } = require("@playwright/test");

const loginPayload = { userEmail: "sampletest123@gmail.com", userPassword: "Test@1234" };

const orderPayload = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] };

const fakePayload = { data: [], message: "No Orders" }

let token;

let orderId;

test.beforeAll(async () => {
   const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
      {
         data: loginPayload

      });
   const loginResponseJson = await loginResponse.json();
   token = loginResponseJson.token;
   console.log(token);

   const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
         data: orderPayload,
         headers:
         {
            'Authorization': token,
            'Content-Type': 'application/json'
         },

      })

   expect(await orderResponse.ok).toBeTruthy();
   const orderResponseJson = await orderResponse.json();
   console.log(orderResponseJson);
   orderId = orderResponseJson.orders[0];
   console.log(orderId);

});


test('login client app', async ({ page }) => {

   await page.addInitScript(value => {

      window.localStorage.setItem('token', value);
   }, token);

   await page.goto("https://rahulshettyacademy.com/client");

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
      async route=>{

         const response = await page.request.fetch(route.request());
         let body = JSON.stringify(fakePayload);
         route.fulfill({
            response,
            body
         })
      }
   )

   await page.locator("button[routerlink*= '/dashboard/myorders']").click();
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   const textmsg =  page.locator("div.mt-4.ng-star-inserted");
   await expect(textmsg).toContainText(" You have No Orders to show at this time.");

})