import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { Bouquet } from 'src/app/models/bouquet.model';
import { Cart } from 'src/app/models/cart.model';
import { Category } from 'src/app/models/category.models';
import { EventSale } from 'src/app/models/events.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { accountService } from 'src/app/service/account.service';
import { bouquetService } from 'src/app/service/bouquet.service';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/cateogry.service';
import { EventService } from 'src/app/service/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit  {
  category: Category[];
  activeBouquet!: string;
  page : number;
  bouquet: Bouquet[];
  eventSale: EventSale[];
  account: Account;

  constructor(
    private bouquetService: bouquetService,
    private categoryService: CategoryService,
    private eventService: EventService,
    private accountSerive: accountService,
    private cartService: CartService,
    private router: Router
  ){}
  ngOnInit(){
    this.categoryService.findAll().then(
      result => {
        this.category = result as Category[];
      },
      err => {
        console.log(err);
      }
    )

    this.eventService.findStatus().then(
      result => {
        this.eventSale = result as EventSale[];
      },
      err => {
        console.log(err);
      }
    )
      // hien thi danh sach tat ca bo hoa
      this.page = 1;
    this.bouquetService.findAll().then(
      result => {
        this.bouquet = result as Bouquet[];
      },
      err => {
        console.log(err);
      }
    )
  }
  previousPage(){
    if(this.page > 1){
      this.page = this.page -1;
    }
  }
  nextPage(){
      if(this.page<this.bouquet.length/9){
          this.page = this.page + 1;
      }
  }

    // select thoe category
    selectCategory(evt:any){
      var categoryId = evt.target.value;
       this.bouquetService.findByCategoryId(categoryId).then(
        result =>{
          this.bouquet = result as Bouquet[];
        },
        err =>{
          console.log(err);
        }
      )
      }
      selectPrice(evt:any){
        var price = evt.target.value;
        this.bouquetService.findByPrice(price).then(
          result => {
            this.bouquet = result as Bouquet[];
          },err =>{
            console.log(err)
          }
        )
      }
      selectEventId(evt:any){
        var eventId = evt.target.value;
        this.bouquetService.findByEventId(eventId).then(
          result =>{
            this.bouquet = result as Bouquet[];
          },err =>{
            console.log(err);
          }
        )
      }

      selectByEventId(){
        this.bouquetService.findByFavorite().then(
          resutl =>{
            this.bouquet = resutl as Bouquet[];
          },err => {
            console.log(err);
          }
        )
      }

      addBouquetToCart(bouquetId: number){
        var bouquetId = bouquetId;
        var userName = sessionStorage.getItem('username');
        this.accountSerive.findAccountIdByUsername(userName).then(
          result => {
            this.account = result as Account;
          }
        );
        if(sessionStorage.getItem('username')!=null){
          const cartToAdd: Cart = {
            accountId: this.account.accountId, bouquetId: bouquetId, quantity: 0, totalPrice: 0, cartId: 0, accountName: '', bouquetName: '', price: 0, imageUrl: ''
          };
          console.log(cartToAdd);
          this.cartService.created(cartToAdd).then(
            resutl=> {
              var resultAPI: ResultAPI = resutl as ResultAPI;
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Add flowers to cart successfully',
              })
            }
          ).catch(err =>{
            Swal.fire({
              icon: 'error',
              title: 'Bouquet has been added to cart',
            })
          })
        }else{
          this.router.navigate(['/login']);
        }
      }
}
