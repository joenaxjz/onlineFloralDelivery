
import { DatePipe } from "@angular/common";
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { EventSale } from "src/app/models/event.model";
import { OrderShow } from "src/app/models/orderShowAll.model";
import { EventService } from "src/app/service/event.service";
import { OrderService } from "src/app/service/order.service";


@Component({
    selector:'app-root',
    templateUrl:'./order.component.html',
})

//interface laf implements
export class OrderComponnent implements OnInit{
    OrderList : OrderShow[];
    
    page : number;
    timeType : string = 'all';
    timeNumber : number = 0;
    startdateofweek: any = '0000-01-01';  
    dateClone: any = '0000-01-01';  
    Enddateofweek: any = '9999-12-31';  
    name: string;  
    
    Total : number;
    constructor(
        public datepipe: DatePipe,
        private orderService : OrderService,
        private router : Router,
    ){}
    ngOnInit() {
        this.page = 1;
        this.orderService.findAll().then(
            result => {
              this.OrderList = result as OrderShow[];
              var a = 0;
              for(var i = 0; i < this.OrderList.length; i++){
                if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
                  if(this.OrderList[i].status==true){
                    a = a + this.OrderList[i].totalOrder; 
                  }
                }
                else{
                  this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
                }
              }
              this.Total = a;
              
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
      var a = 0;
      var b = 0;
      for(var i = 0; i < this.OrderList.length; i++){
        if(this.OrderList[i].orderDate >= this.startdateofweek){
          if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
            if(this.OrderList[i].status==true){
              a = a + this.OrderList[i].totalOrder; 
            }
          }
          b ++;
        }
      }
      if(this.page<b/10){
        this.page = this.page +1;
      }
      this.Total = a;
    }

    selectStatistical(evt:any){
      
      var option =evt.target.value;
      let getdate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      
      
      function startOfWeek(date) {  
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : +1);  
        return new Date(date.setDate(diff));  
      }  
      function endofweek(date) {  
        var lastday = date.getDate() - (date.getDay() - 1) + 6;  
        return new Date(date.setDate(lastday));  
      }  
      var dt = new Date(getdate);
      var dt2 = new Date(getdate);  

      if(option == 'all'){
        this.startdateofweek= '0001-01-01';  
        this.Enddateofweek= '9999-12-31';
        this.dateClone = '0001-01-01'; 
        this.timeType = 'all';
      }
      if(option == 'week'){
        this.startdateofweek= this.datepipe.transform(startOfWeek(dt),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(endofweek(dt2),'yyyy-MM-dd');  
        this.timeType = 'week';
      }
      if(option == 'month'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth(), 1),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth() + 1, 0),'yyyy-MM-dd');  
        this.timeType = 'month';
      }
      if(option == 'year'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear(), 0),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear()+1, 0,-1),'yyyy-MM-dd');  
        this.timeType = 'year';
      }
      this.page = 1;
      this.orderService.findAll().then(
        result => {
          this.OrderList = result as OrderShow[];
          var a = 0;
          for(var i = 0; i < this.OrderList.length; i++){
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==true){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
            }
          }
          this.Total = a;
        },
        error =>{
          console.log(error);
        }
      )
    }
    updateRevenue(){
      this.orderService.findAll().then(
        result => {
          this.OrderList = result as OrderShow[];
          var a = 0;
        
          for(var i = 0; i < this.OrderList.length; i++){
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==true){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
            }
          }
          this.Total = a;
        },
        error =>{
          console.log(error);
        }
      )
    }
    previousTime(){
      var option = this.timeType;
      this.timeNumber --;
      let getdate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');  
      function startOfWeek(date,number) {  
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : +1+number);  
        return new Date(date.setDate(diff));  
      }  
      function endofweek(date,number) {  
        var lastday = date.getDate() - (date.getDay() - 1) + 6+number;  
        return new Date(date.setDate(lastday));  
      }  
      var dt = new Date(getdate);
      var dt2 = new Date(getdate);  

      if(option == 'all'){
        this.startdateofweek= '0001-01-01';  
        this.Enddateofweek= '9999-12-31';
        this.dateClone = '0001-01-01'; 
        this.timeType = 'all';
      }
      if(option == 'week'){
        this.startdateofweek= this.datepipe.transform(startOfWeek(dt,this.timeNumber*7),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(endofweek(dt2,this.timeNumber*7),'yyyy-MM-dd');  
        this.timeType = 'week';
      }
      if(option == 'month'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth()+this.timeNumber, 1),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth() + 1+this.timeNumber, 0),'yyyy-MM-dd');  
        this.timeType = 'month';
      }
      if(option == 'year'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear()+this.timeNumber, 0),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear()+1+this.timeNumber, 0,-1),'yyyy-MM-dd');  
        this.timeType = 'year';
      }
      this.page = 1;
      this.orderService.findAll().then(
        result => {
          this.OrderList = result as OrderShow[];
          var a = 0;
          for(var i = 0; i < this.OrderList.length; i++){
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==true){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
            }
          }
          this.Total = a;
          if(this.OrderList.length<1){
            this.timeNumber = this.timeNumber + 2;
          }
        },
        error =>{
          console.log(error);
        }
      )
    }
    nextTime(){
      var option = this.timeType;
      this.timeNumber ++;
      let getdate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');  
      function startOfWeek(date,number) {  
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : +1+number);  
        return new Date(date.setDate(diff));  
      }  
      function endofweek(date,number) {  
        var lastday = date.getDate() - (date.getDay() - 1) + 6+number;  
        return new Date(date.setDate(lastday));  
      }  
      var dt = new Date(getdate);
      var dt2 = new Date(getdate);  

      if(option == 'all'){
        this.startdateofweek= '0001-01-01';  
        this.Enddateofweek= '9999-12-31';
        this.dateClone = '0001-01-01'; 
        this.timeType = 'all';
      }
      if(option == 'week'){
        this.startdateofweek= this.datepipe.transform(startOfWeek(dt,this.timeNumber*7),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(endofweek(dt2,this.timeNumber*7),'yyyy-MM-dd');  
        this.timeType = 'week';
      }
      if(option == 'month'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth()+this.timeNumber, 1),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth() + 1+this.timeNumber, 0),'yyyy-MM-dd');  
        this.timeType = 'month';
      }
      if(option == 'year'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear()+this.timeNumber, 0),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear()+1+this.timeNumber, 0,-1),'yyyy-MM-dd');  
        this.timeType = 'year';
      }
      this.page = 1;
      this.orderService.findAll().then(
        result => {
          this.OrderList = result as OrderShow[];
          var a = 0;
          for(var i = 0; i < this.OrderList.length; i++){
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==true){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
            }
          }
          this.Total = a;
          if(this.OrderList.length<1){
            this.timeNumber = this.timeNumber - 2;
          }
        },
        error =>{
          console.log(error);
        }
      )
    }
    selectStatus(evt : any){
      if(evt.target.value == 'all'){
        this.orderService.findAll().then(
          result => {
            this.OrderList = result as OrderShow[];
            var a = 0;
            for(var i = 0; i < this.OrderList.length; i++){
              if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
                if(this.OrderList[i].status==true){
                  a = a + this.OrderList[i].totalOrder; 
                }
              }
              else{
                this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
              }
            }
            this.Total = a;
            if(this.OrderList.length<1){
              this.timeNumber = this.timeNumber + 2;
            }
          },
          error =>{
            console.log(error);
          }
        )
      }
      if(evt.target.value == 'paid'){
        this.orderService.findAll().then(
          result => {
            this.OrderList = result as OrderShow[];
            var a = 0;
            for(var i = 0; i < this.OrderList.length; i++){
              if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
                if(this.OrderList[i].status==true){
                  a = a + this.OrderList[i].totalOrder; 
                }
              }
              else{
                this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
                this.OrderList = this.OrderList.filter(item => item.status = true);
              }
            }
            this.Total = a;
            if(this.OrderList.length<1){
              this.timeNumber = this.timeNumber + 2;
            }
          },
          error =>{
            console.log(error);
          }
        )
      }
      if(evt.target.value == 'unpaid'){
        this.orderService.findAll().then(
          result => {
            this.OrderList = result as OrderShow[];
            var a = 0;
            for(var i = 0; i < this.OrderList.length; i++){
              if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
                if(this.OrderList[i].status==true){
                  a = a + this.OrderList[i].totalOrder; 
                }
              }
              else{
                this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
                this.OrderList = this.OrderList.filter(item => item.status = false);
              }
            }
            this.Total = a;
            if(this.OrderList.length<1){
              this.timeNumber = this.timeNumber + 2;
            }
          },
          error =>{
            console.log(error);
          }
        )
      }
    }
    
}