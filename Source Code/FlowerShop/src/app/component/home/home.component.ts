import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { Bouquet } from 'src/app/models/bouquet.model';
import { Cart } from 'src/app/models/cart.model';
import { accountService } from 'src/app/service/account.service';
import { bouquetService } from 'src/app/service/bouquet.service';
import { CartService } from 'src/app/service/cart.service';
import { FormControl } from '@angular/forms';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { EventService } from 'src/app/service/event.service';
import { EventSale } from 'src/app/models/events.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit  {

  newbouquet?: Bouquet[];
  favoritebouqute?: Bouquet[];
  cateogryIdBouquet?: Bouquet[];
  activeBouquet!: string;
  addBqToCart: Cart;
  account:Account;
  eventSale: EventSale[];
  eventDealOfMonth: EventSale;

  constructor(
    private bouquetService: bouquetService,
    private cartService: CartService,
    private accountService: accountService,
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){}
  ngOnInit(){

    //hiện thị sản phẩm mới nhất
    this.bouquetService.findNewBouquet().then(
      result => {
        this.newbouquet = result as Bouquet[];
      },
      err => {
        console.log(err);
      }
    )
    // hiện thị sản phẩm bán nhiều nhất
    this.bouquetService.findFavoriteBouquet().then(
      result => {
        this.favoritebouqute = result as Bouquet[];
      },
      err => {
        console.log(err);
      }
    )

      // hiện thị sản phẩm theo từng loại category
      this.bouquetService.findCategoryIdBouquet().then(
        result => {
          this.cateogryIdBouquet = result as Bouquet[];
        },
        err => {
          console.log(err);
        }
      )


      this.eventService.findEventIsActionUser().then(
      result => {
        this.eventSale = result as EventSale[];
        console.log(this.eventSale);
      },
      err => {
        console.log(err);
      }
    )
    this.eventService.findEvenUserDealOfMonth().then(
      result => {
        this.eventDealOfMonth = result as EventSale;
        console.log(this.eventSale);
      },
      err => {
        console.log(err);
      }
    )
  }

  addBouquetToCart(bouquetId: number){
    var bouquetid = bouquetId;
    console.log(bouquetid);
    var userName = sessionStorage.getItem('username');
    this.accountService.findAccountIdByUsername(userName).then(
      resutl => {
        this.account = resutl as Account;
      }
    );
    if (sessionStorage.getItem('username') != null) {
      // var cart :Cart = this.addBqToCart as Cart;
      const cartToAdd: Cart = { accountId: this.account.accountId, bouquetId: bouquetid, quantity: 0, totalPrice: 0, cartId: 0, accountName: '', bouquetName: '', price: 0, imageUrl: '' };
      console.log(cartToAdd);
      this.cartService.created(cartToAdd).then(
        result => {
          console.log(result);
          var resultAPI: ResultAPI = result as ResultAPI;
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Add flowers to cart successfully',
          })
        },
        ).catch(err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Bouquet has been added to cart',
          })
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  addNewBouquetToCart(bouquetId: number) {
    var bouquetid = bouquetId;
    console.log(bouquetid);
    var userName = sessionStorage.getItem('username');
    this.accountService.findAccountIdByUsername(userName).then(
      result => {
        this.account = result as Account;
      }
    );

    if (sessionStorage.getItem('username') != null) {
      const cartToAdd: Cart = { accountId: this.account.accountId, bouquetId: bouquetid, quantity: 0, totalPrice: 0, cartId: 0, accountName: '', bouquetName: '', price: 0, imageUrl: '' };
      console.log(cartToAdd);
      this.cartService.created(cartToAdd).then(
        result => {
          console.log(result);
          var resultAPI: ResultAPI = result as ResultAPI;
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Add flowers to cart successfully',

          })
        }
      ).catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Bouquet has been added to cart',
        })
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
