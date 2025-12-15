import {test,expect,request} from '@playwright/test';

test('network abort test',async({page})=>{

   await page.goto("https://rahulshettyacademy.com/client/");
   await page.locator("#userEmail").fill("sampletest123@gmail.com");
   await page.locator("#userPassword").fill('Test@1234');
   await page.locator("#login").click();
   await page.route('**/*{jpg,png,jpeg}',route => route.abort());
   await page.pause();

})