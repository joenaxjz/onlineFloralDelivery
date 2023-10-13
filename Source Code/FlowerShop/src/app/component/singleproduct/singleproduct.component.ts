import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { commentService } from 'src/app/service/comment.service';
import { Comment } from 'src/app/models/commentbouquet.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { Bouquet } from 'src/app/models/bouquet.model';
import { bouquetService } from 'src/app/service/bouquet.service';
import { ImageBouquetService } from 'src/app/service/images.service';
import { Imagebouquet } from 'src/app/models/images.models';
import { accountService } from 'src/app/service/account.service';
import { Account } from 'src/app/models/account.model';
import { CartService } from 'src/app/service/cart.service';
import { Cart } from 'src/app/models/cart.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './singleproduct.component.html'
})
export class SingleProductComponent implements OnInit  {
  bouquet: Bouquet;
  commentForm!: FormGroup;
  id!:string;
  result:string;
  commentList :Comment[];
  image: Imagebouquet[];
  account: Account;
  addSuccessMessage: string;
  quantity: number = 0;
  totalPrice: number = 0;

  constructor(
      private  formBuilder: FormBuilder,
      private commentService:commentService ,
      private bouquetSerive: bouquetService,
      private imagebouquetService: ImageBouquetService,
      private accountService: accountService,
      private cartSerive: CartService,
      private router:Router,
      private activatedRoute: ActivatedRoute
         ){}


  ngOnInit(){

    this.activatedRoute.paramMap.subscribe(p=>{
      var bouquetId = p.get('bouquetId');
      console.log(bouquetId);
      this.bouquetSerive.findByBouquetId(bouquetId!).then(
        result => {
          this.bouquet = result as Bouquet;
        },
        err => {
          console.log(err);
        }
      )
    })


    var userName = sessionStorage.getItem('username');
    this.accountService.findAccountIdByUsername(userName).then(
      result => {
        this.account = result as Account;

        this.activatedRoute.paramMap.subscribe(p => {
          var bouquetId = p.get('bouquetId');

          this.commentForm! = this.formBuilder.group({
            content: '',
            accountId: this.account.accountId.toString(),
            bouquetId: bouquetId,

          });
        });
      }
    );

  this.activatedRoute.paramMap.subscribe(p => {
    var bouquetId = p.get('bouquetId');
    this.commentService.findByBouquetId(bouquetId).then(resutl =>{
      this.commentList = resutl as Comment[];
      console.log(this.commentList);
    },
    err =>{
      console.log(err);
    }
    );
    });


  this.activatedRoute.paramMap.subscribe(p => {
    var bouquetId = p.get('bouquetId');
    this.imagebouquetService.findbyid(bouquetId).then(resutl =>{
      this.image = resutl as Imagebouquet[];
      console.log(this.image);
    },
    err =>{
      console.log(err);
    }
    );
    });
  }


  save(){
    if (sessionStorage.getItem('username') != null) {
      var comment: Comment = this.commentForm.value as Comment;
      console.log(comment);
      this.commentService.addComment(comment).then(
        result => {
          console.log(result);
          this.activatedRoute.paramMap.subscribe(p => {
            var bouquetId = p.get('bouquetId');
            this.commentService.findByBouquetId(bouquetId).then(resutl =>{
              this.commentList = resutl as Comment[];
              console.log(this.commentList);
              Swal.fire({
                icon: 'success',
                title: 'Success',
              })
            },
            err =>{
              console.log(err);
            }
            );
            });
          var resultAPI: ResultAPI = result as ResultAPI;
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.router.navigate(['/login']);
    }
}
updateTotalPrice(){
  this.totalPrice = this.bouquet.price * this.quantity;
}
addBouquetToCart(bouquetId: any, quantity: number, totalPrice: number){
  console.log(bouquetId);
  console.log(quantity);
  console.log(totalPrice);
  var userName = sessionStorage.getItem('username');
  this.accountService.findAccountIdByUsername(userName).then(
    result => {
      this.account =result as Account;
    }
  );
  if(sessionStorage.getItem('username')!=null){
    const cartToAdd: Cart = {
      accountId: this.account.accountId, bouquetId: bouquetId, quantity: quantity, totalPrice:totalPrice, cartId:0, accountName: '',bouquetName:'',price:0,imageUrl:''
    };
    console.log(cartToAdd);
    this.cartSerive.created(cartToAdd).then(
      result => {
        console.log(result);
        var resultAPI: ResultAPI = result as ResultAPI;
        this.router.navigate(['/cart']);
      }
    ).catch(err =>{
      Swal.fire({
        icon: 'error',
        title: 'Flower bouquet has been added to cart!',
      })
      // alert('Flower bouquet has been added to cart!');
    })
  }else{
    this.router.navigate(['/login']);
  }
}
}
