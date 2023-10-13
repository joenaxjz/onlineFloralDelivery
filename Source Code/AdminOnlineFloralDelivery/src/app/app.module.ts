import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponnent } from './component/login/login.component';
import { AdminComponnent } from './component/admin/admin.component';
import { DashboardComponnent } from './component/dashboard/dashboard.component';
import { OrderComponnent } from './component/order/order.component';
import { ProfileComponnent } from './component/profile/profile.component';
import { CategoriesComponnent } from './component/categories/categories.component';
import { CartComponnent } from './component/cart/cart.component';
import { EventComponnent } from './component/e_vent/event.component';
import { AccountComponnent } from './component/account/account.component';
import { ContactComponnent } from './component/contact/contact.component';
import { RegisterComponnent } from './component/register/register.component';
import { MailComponnent } from './component/mail/mail.component';
import { AddCategorybouquetComponnent } from './component/add/categorybouquet/categorybouquet.component';
import { AddRoleComponnent } from './component/add/role/role.component';
import { EditCategorybouquetComponnent } from './component/edit/categorybouquet/categorybouquet.component';
import { EditBouquetComponnent } from './component/edit/bouquet/bouquet.component';
import { EditRoleComponnent } from './component/edit/role/role.component';
import { BouquetComponnent } from './component/bouquet/bouquet.component';
import { BaseURLService } from './service/baseurl.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BouquetSerice } from './service/bouquet.service';
import { CategoryService } from './service/cateogry.service';
import { AddBouquetComponnent } from './component/add/bouquet/bouquet.component';
import { ImageBouquetService } from './service/imageBouquet.service';

//PRIME IMPORT
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { BouquetDetailComponent } from './component/edit/bouquetdetail/bouquetdetail.component';
import { BouquetImagesComponent } from './component/edit/bouquetimages/bouquetimages.component';
import { DetailBouquetComponent } from './component/detail/detailBouquet/detailbouquet.component';
import { DetailCategoryComponent } from './component/detail/detailCategory/detailcategory.component';
import { AddEventComponnent } from './component/add/e_vent/eventcomponent';
import { EditEventComponnent } from './component/edit/e_vent/event.component';
import { DetailEventComponent } from './component/detail/detailEvent/detailevent.component';

import { DetailContactComponent } from './component/detail/contact/detailcontact.component';
import { DetailReplyComponent } from './component/detail/replycontact/detailreply.component';
import { EventService } from './service/event.service';
import { CartService } from './service/cart.service';
import { CommentService } from './service/comment.service';
import { CommentComponent } from './component/comment/comment.component';
import { BouquetEventComponent } from './component/bouquetEvent/bouquetEvent.component';
import { BouquetEventSerice } from './service/bouquetevent.service';
import { AccountService } from './service/account.service';
import { ContactService } from './service/contact.service';
import { DatePipe } from '@angular/common';
import { RoleAdminComponnent } from './component/role/role.component';
import { OrderService } from './service/order.service';
import { DeliveryService } from './service/delivery.service';
import { DeliveryComponent } from './component/delivery/delivery.component';
import { OrderDetailComponent } from './component/detail/orderDetail/orderdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponnent,
    AdminComponnent,
    DashboardComponnent,
    OrderComponnent,
    ProfileComponnent,
    CategoriesComponnent,
    CartComponnent,
    EventComponnent,
    AccountComponnent,
    ContactComponnent,
    RegisterComponnent,
    MailComponnent,
    BouquetComponnent,
    RoleAdminComponnent,
    CommentComponent,
    BouquetDetailComponent,
    BouquetImagesComponent,
    DetailBouquetComponent,
    DetailCategoryComponent,
    DetailEventComponent,
    DetailContactComponent,
    DetailReplyComponent,
    OrderDetailComponent,
    BouquetEventComponent,
    DeliveryComponent,
    //ADD

    AddCategorybouquetComponnent,
    AddBouquetComponnent,
    AddEventComponnent,
    AddRoleComponnent,

    //EDIT

    EditCategorybouquetComponnent,
    EditBouquetComponnent,
    EditEventComponnent,

    EditRoleComponnent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //PRIME
    CalendarModule,
    BrowserAnimationsModule,
    DropdownModule,
    FileUploadModule,
  ],
  providers: [
    BaseURLService,
    BouquetSerice,
    CategoryService,
    EventService,
    ImageBouquetService,
    CartService,
    CommentService,
    BouquetEventSerice,
    AccountService,
    ContactService,
    OrderService,
    DatePipe,
    DeliveryService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
