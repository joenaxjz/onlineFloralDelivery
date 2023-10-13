import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AddBouquetComponnent } from './component/add/bouquet/bouquet.component';
import { AddRoleComponnent } from './component/add/role/role.component';
import { EditCategorybouquetComponnent } from './component/edit/categorybouquet/categorybouquet.component';
import { EditBouquetComponnent } from './component/edit/bouquet/bouquet.component';
import { EditRoleComponnent } from './component/edit/role/role.component';
import { BouquetComponnent } from './component/bouquet/bouquet.component';
import { BouquetDetailComponent } from './component/edit/bouquetdetail/bouquetdetail.component';
import { BouquetImagesComponent } from './component/edit/bouquetimages/bouquetimages.component';
import { DetailBouquetComponent } from './component/detail/detailBouquet/detailbouquet.component';
import { DetailCategoryComponent } from './component/detail/detailCategory/detailcategory.component';
import { AddEventComponnent } from './component/add/e_vent/eventcomponent';
import { EditEventComponnent } from './component/edit/e_vent/event.component';
import { DetailEventComponent } from './component/detail/detailEvent/detailevent.component';

import { DetailContactComponent } from './component/detail/contact/detailcontact.component';
import { DetailReplyComponent } from './component/detail/replycontact/detailreply.component';
import { CommentComponent } from './component/comment/comment.component';
import { BouquetEventComponent } from './component/bouquetEvent/bouquetEvent.component';
import { RoleAdminComponnent } from './component/role/role.component';
import { DeliveryComponent } from './component/delivery/delivery.component';
import { OrderDetailComponent } from './component/detail/orderDetail/orderdetail.component';




const routes: Routes = [
  // {path: '', component: LoginComponnent},
  {path: 'login', component: LoginComponnent},
  {
    path: 'admin', component: AdminComponnent, children:[
      // {path: '', component: DashboardComponnent},
      {path: 'dashboard', component: DashboardComponnent},
      {path: 'bouquet', component: BouquetComponnent},
      {path:'order',component: OrderComponnent },
      {path:'profile',component: ProfileComponnent },
      {path:'categories',component: CategoriesComponnent },
      {path:'cart',component: CartComponnent },
      {path:'comment',component: CommentComponent},
      {path:'event',component: EventComponnent },
      {path:'account',component: AccountComponnent },
      {path:'contact',component: ContactComponnent },
      {path:'register',component: RegisterComponnent },
      {path:'roleadmin',component: RoleAdminComponnent },
      {path:'mail',component: MailComponnent },
      {path:'bouquetEvent',component: BouquetEventComponent },
      {path:'add/categorybouquet',component: AddCategorybouquetComponnent },
      {path:'add/bouquet',component: AddBouquetComponnent },
      {path:'add/event',component: AddEventComponnent },
      {path:'add/role',component: AddRoleComponnent },
      {path:'delivery',component: DeliveryComponent },



      {path:'edit/categorybouquet',component:  EditCategorybouquetComponnent },
      {path:'edit/bouquet',component: EditBouquetComponnent, children:[
        {path: 'detail',component: BouquetDetailComponent},
        {path: 'images',component: BouquetImagesComponent},
        {path: '',component: BouquetDetailComponent},
      ] },

      {path:'detail/detailbouquet',component: DetailBouquetComponent },
      {path:'detail/detailcategory',component: DetailCategoryComponent },
      {path:'detail/detailevent',component: DetailEventComponent },
      {path:'detail/detailcontact',component: DetailContactComponent },
      {path:'detail/replycontact',component: DetailReplyComponent },
      {path:'detail/orderdetail',component: OrderDetailComponent },

      {path:'edit/event',component: EditEventComponnent },
      {path:'edit/role',component: EditRoleComponnent },


  ]},


   {
    path: '', component: AdminComponnent, children:[
      {path: '', component: OrderComponnent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
