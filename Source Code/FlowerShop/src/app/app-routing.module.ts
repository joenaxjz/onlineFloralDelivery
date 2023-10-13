import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { ContactComponent } from './component/contact/contact.component';
import { ShopComponent } from './component/shopflower/shop.component';
import { SingleProductComponent } from './component/singleproduct/singleproduct.component';
import { CheckOutComponent } from './component/checkout/checkout.component';
import { CartComponent } from './component/cart/cart.component';
import { MyProfileComponent } from './component/myprofile/myprofile.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { OrderdetailComponent } from './component/orderdetail/orderdetail.component';
import { OrderHistoryComponent } from './component/orderhistory/orderhistory.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'aboutus',component: AboutUsComponent},
  {path: 'contact',component: ContactComponent},
  {path: 'shop',component: ShopComponent},
  {path: 'singleProduct',component: SingleProductComponent},
  {path: 'checkout',component: CheckOutComponent},
  {path: 'cart',component: CartComponent},
  {path: 'myprofile',component: MyProfileComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'confirm',component: ConfirmComponent},
  {path: 'orderdetail',component: OrderdetailComponent},
  {path: 'orderhistory',component: OrderHistoryComponent},
  {path: '',component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
