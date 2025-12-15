class OrderPage
{
   constructor(page)
   {
      this.page = page;
      this.orderhistory = page.locator("[routerlink*='/dashboard/myorders']").nth(0);
      
   }

   async confirmationScreen()
   {
      await this.orderhistory.click();
      
      
   }

}
module.exports=OrderPage;