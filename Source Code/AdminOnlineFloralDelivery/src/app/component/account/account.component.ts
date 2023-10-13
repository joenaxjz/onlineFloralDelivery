import { DatePipe } from "@angular/common";
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Account } from "src/app/models/acount.model";
import { EventSale } from "src/app/models/event.model";
import { AccountService } from "src/app/service/account.service";
import { EventService } from "src/app/service/event.service";


@Component({
    selector:'app-root',
    templateUrl:'./account.component.html',
})

//interface laf implements
export class AccountComponnent implements OnInit{
    AccountList : Account[];
    page : number;
    constructor(
        private AccountService: AccountService,
        private router : Router,
        public datepipe : DatePipe,
    ){}
    ngOnInit() {

        this.page = 1;
        console.log(this.page);
        this.AccountService.findAll().then(
            result => {
              this.AccountList = result as Account[];
              this.AccountList = this.AccountList.filter(item => item.roleId == 4);
            },
            error =>{
              console.log(error);
            }
          )
    }
    previousPage(){
      if(this.page >1){
        this.page = this.page -1;
      }
    }
    nextPage(){
        if(this.page<this.AccountList.length/20){
            this.page = this.page +1;
        }


    }
    findName(evt : any){
      var keyword = evt.target.value.toUpperCase();
      if(keyword == ''){
        this.AccountService.findAll().then(
          result => {
            this.AccountList = result as Account[];
            console.log(this.AccountList);

          },
          error =>{
            console.log(error);
          }
        )
      }else{
        this.AccountService.findName(keyword).then(
          res =>{
              this.AccountList = res as Account[];
              console.log(this.AccountList);
          },
          err =>{
              console.log(err);
          }
      )
      }
    }
    selectStatus(evt : any){
      var option = evt.target.value;
      if(option == '1'){
        this.AccountService.findAll().then(
          result => {
            this.AccountList = result as Account[];
            console.log(this.AccountList);

          },
          error =>{
            console.log(error);
          }
        )
      }
      if(option == '2'){
        this.AccountService.findAll().then(
          result => {
            this.AccountList = result as Account[];
            console.log(this.AccountList);
            this.AccountList = this.AccountList.filter(item => item.status == true);
          },
          error =>{
            console.log(error);
          }
        )
      }
      if(option == '3'){
        this.AccountService.findAll().then(
          result => {
            this.AccountList = result as Account[];
            console.log(this.AccountList);
            this.AccountList = this.AccountList.filter(item => item.status == false);
          },
          error =>{
            console.log(error);
          }
        )
      }
    }
}
