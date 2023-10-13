import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Delivery } from "src/app/models/delivery.model";
import { DeliveryService } from "src/app/service/delivery.service";

@Component({
    selector:'app-root',
    templateUrl:'./delivery.component.html',

})

//interface laf implements
export class DeliveryComponent implements OnInit{

  DeliveryList : Delivery[];
  page : number;
  constructor(
      private deliveryService : DeliveryService,
      private router : Router,
  ){}
  ngOnInit() {

      this.page = 1;
      console.log(this.page);
      this.deliveryService.findAll().then(
          result => {
            this.DeliveryList = result as Delivery[];
            console.log(this.DeliveryList);
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
      if(this.page<this.DeliveryList.length/5){
          this.page = this.page +1;
      }


  }
}
