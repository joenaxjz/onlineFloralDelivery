
import { Component, OnInit ,} from "@angular/core";
import { Cart } from "src/app/models/cart.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { CartService } from "src/app/service/cart.service";



@Component({
    selector:'app-root',
    templateUrl:'./cart.component.html',

})

//interface laf implements
export class CartComponnent implements OnInit{
    cart: Cart[];
    constructor(
      private cartService: CartService,

    ){}


    ngOnInit() {
      this.cartService.findAll().then(
        result =>{
          this.cart =result as Cart[];
          console.log("Cart : ",this.cart);
        },
        err =>{
          console.log(err);
        }
      )

    }
}
