class LandingPage
{

   constructor(page)

   {
      this.page=page;
      this.addtocart=page.getByRole("button",{name:" Add To Cart"}).nth(1);
      
   }

   async clientlandingPage()

   {
      await this.addtocart.click();
   }

 

}
module.exports=LandingPage;