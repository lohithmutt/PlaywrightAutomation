import {test,expect,request} from '@playwright/test';

let webConetxt;
test.beforeAll(async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("#userEmail").fill("sampletest123@gmail.com");
await page.locator("#userPassword").fill("Test@1234");
await page.locator("#login").click();
await page.waitForLoadState('networkidle');
await context.storageState({path:'state.json'});
webConetxt = await browser.newContext({storageState:'state.json'});

})

test('api demo',async ({}) =>{

const page  = await webConetxt.newPage();
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("button[routerlink*= '/dashboard/myorders']").click();


})