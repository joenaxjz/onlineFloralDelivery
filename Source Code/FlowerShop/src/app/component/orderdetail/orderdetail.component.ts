import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { ListOrderDetail } from 'src/app/models/listorderdetail.model';
import { accountService } from 'src/app/service/account.service';
import { OrdersService } from 'src/app/service/orders.service';


@Component({
  selector: 'app-root',
  templateUrl: './orderdetail.component.html'
})
export class OrderdetailComponent implements OnInit  {
  listOrderDetail: ListOrderDetail[]= [];
  account: Account;
  pendingOrderIds: number[] = [];
  updateIntervalTime = 120000;
  withinTimeLimit = 120000;
  constructor(
    private orderService: OrdersService,
    private accountService: accountService,
    private router: Router
    ) { }
    async ngOnInit(){
      var userName = sessionStorage.getItem('username');
      try {
        const result = await this.accountService.findAccountIdByUsername(userName);
        const account = result as Account; // Assuming the
        console.log("accountId:", account.accountId);
        await this.orderService.findByAccountId(account.accountId).then(
          result =>{
            this.listOrderDetail = result as ListOrderDetail[];
          }
        )
          console.log(this.listOrderDetail);
      } catch (err) {
        console.log(err);
      }
      
    }



}
