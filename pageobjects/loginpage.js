class LoginPage
{

   constructor(page)

   {

      this.page=page;
      this.username=page.locator("#userEmail");
      this.password=page.locator("#userPassword");
      this.login=page.locator("#login");
      this.addtocart=page.getByRole("button",{name:" Add To Cart"}).nth(1);

   }

   async navigateToApp()
   {
      await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   }

  async loginToApplication(username,password)
  {
   await this.username.fill(username);
   await this.password.fill(password);  
  }

  async clickonLogin()
  {
   await this.login.click();
  }

  async cartIsVisible()
  {
   await this.textConetnt();
  }

}

module.exports=LoginPage;