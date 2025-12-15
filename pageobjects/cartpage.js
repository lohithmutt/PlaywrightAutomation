class CartPage
{
   constructor(page)
   {
      this.page=page;
      this.clickoncart=page.locator("li button[routerlink*='cart']");
      this.checkout=page.getByRole("button",{name:"Checkout"});
      this.dateoption=page.locator("select.input.ddl").nth(0);
      this.yearoption=page.locator("select.input.ddl").nth(1);
      this.cvv=page.locator("div.field.small input.input.txt").nth(0);
      this.cardname=page.locator("div.field input.input.txt").nth(2);
      this.placeorder=page.locator("a.btnn.action__submit.ng-star-inserted");
     
   }

     async navigateToCart()
   {
      await this.clickoncart.click();
      
   }

   async clickOnCheckout()
   {
      await this.checkout.click();
   }

   async personalInfo()
   {

      await this.dateoption.selectOption("06");
      await this.yearoption.selectOption("10");
      await this.cvv.fill("123");
      await this.cardname.fill("sample");
      
   }

   async placeOrder()
   {
      await this.placeorder.click();
   }


}
module.exports=CartPage;