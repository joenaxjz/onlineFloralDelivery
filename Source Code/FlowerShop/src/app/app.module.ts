import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { ContactComponent } from './component/contact/contact.component';
import { ShopComponent } from './component/shopflower/shop.component';
import { SingleProductComponent } from './component/singleproduct/singleproduct.component';
import { CheckOutComponent } from './component/checkout/checkout.component';
import { CartComponent } from './component/cart/cart.component';
import { MyProfileComponent } from './component/myprofile/myprofile.component';
import { BaseURLService } from './service/baseurl.service';
import { contactService } from './service/contact.service';
import { commentService } from './service/comment.service';
import { accountService } from './service/account.service';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { bouquetService } from './service/bouquet.service';
import { CategoryService } from './service/cateogry.service';
import { EventService } from './service/event.service';
import { ImageBouquetService } from './service/images.service';
import { CartService } from './service/cart.service';
import { OrdersService } from './service/orders.service';
import { OrderDetailService } from './service/orderdetail.service';
import { OrderdetailComponent } from './component/orderdetail/orderdetail.component';
import { DeliveryService } from './service/delivery.service';
import { OrderHistoryComponent } from './component/orderhistory/orderhistory.component';
import { DatePipe } from '@angular/common';

import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    ShopComponent,
    SingleProductComponent,
    CheckOutComponent,
    CartComponent,
    MyProfileComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    OrderdetailComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule

  ],
  providers: [
    BaseURLService,
    contactService,
    commentService,
    accountService,
    bouquetService,
    CategoryService,
    EventService,
    ImageBouquetService,
    CartService,
    OrdersService,
    OrderDetailService,
    DeliveryService,
    DatePipe

  ],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
