const{test,expect} = require("@playwright/test");

let resid;
test('get product',async ({request}) => {

  const response = await request.get("https://api.restful-api.dev/objects");
  const responseJson = await response.json()
  console.log(responseJson);
  expect(response.ok).toBeTruthy();

});

test('create a product', async ({request}) => {

   const response = await request.post("https://api.restful-api.dev/objects",
   {
      data :
      {
         "name": "Apple MacBook Pro M5"
      },
      headers:
      {
         "Accept" : "application/json"
      }
   });

   const responseJson = await response.json();
   resid = responseJson.id;
   console.log(resid);
   console.log(responseJson);

})

test('update a product', async ({request}) => {

   const response = await request.put("https://api.restful-api.dev/objects"+resid,
   {
      data :
      {
         "name": "Apple MacBook Pro"
      },
      headers:
      {
         "Accept" : "application/json"
      }
   });

   const responseJson = await response.json();
   resid = responseJson.id;
   console.log(responseJson);

})

test('delete product',async ({request}) => {

  const response = await request.delete("https://api.restful-api.dev/objects/"+resid);
  const responseJson = await response.json()
  console.log(responseJson);
  expect(response.ok).toBeTruthy();

})