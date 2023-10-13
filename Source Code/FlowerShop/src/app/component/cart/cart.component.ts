import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit  {
  cartList: Cart[];
  price: number;// Giá mỗi sản phẩm
  quantity: number; // Số lượng sản phẩm
  totalPrice: number; // Giá tổng
  cartupdate!: Cart;
  formUpdate: FormGroup;
  totalAmount: number = 0; // Biến lưu trữ tổng tiền
  totalQuantity: number = 0;
  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder
  ){

  }
  ngOnInit(){

    var userName = sessionStorage.getItem('username');
    this.cartService.findByAccountName(userName).then(
      result => {
        this.cartList = result as Cart[];
        this.calculateTotalAmount();
        this.calculateTotalQuantity();
      },
      err => {
        console.log(err);
      }
    )

  }
  calculateTotalAmount() {
    this.totalAmount = 0; // Reset lại tổng tiền
    if (this.cartList) {
      for (const cart of this.cartList) {
        this.totalAmount += cart.totalPrice;
      }
    }
  }
  calculateTotalQuantity(){
    this.totalQuantity = 0;
    if(this.cartList){
      for(const cart of this.cartList){
        this.totalQuantity += cart.quantity;
      }
    }
  }
  calculateTotalPrice(cart: Cart) {
    // Tính toán giá tổng dựa vào giá và số lượng
    cart.totalPrice = cart.price * cart.quantity;
    this.calculateTotalAmount();
  }

  updateCart(cartId:number, quantity: number){
    var cartId = cartId;
    console.log(cartId);
    const cartToUpdate = this.cartList.find(cart => cart.cartId === cartId);

    if (cartToUpdate) {
      // Nếu tìm thấy cart, cập nhật giá trị quantity và totalPrice cho cart
      cartToUpdate.cartId = cartId;
      cartToUpdate.accountId = cartToUpdate.accountId;
      cartToUpdate.bouquetId = cartToUpdate.bouquetId;
      cartToUpdate.quantity = quantity;
      cartToUpdate.totalPrice = cartToUpdate.price * quantity;
      console.log(cartToUpdate);
      // Gọi service để cập nhật cart trên server (nếu cần)
      this.cartService.update(cartToUpdate).then(
        (updatedCart: Cart) => {
          console.log("Updated cart on server:", updatedCart);
          Swal.fire({
            icon: 'success',
            title: 'Update Success!',
          })
        },
        err => {
          console.log("Error while updating cart on server:", err);
        }
      );
    }
 }
 loadData(){
  var userName = sessionStorage.getItem('username');
  this.cartService.findByAccountName(userName).then(
    result => {
      this.cartList = result as Cart[];
    },
    err => {
      console.log(err);
    }
  )
}
 async deleteCart(cartId: any) {
  var result = confirm("Are you sure?");
  if (result) {
    try {
      // Xóa cart
      const res = await this.cartService.delete(cartId) as ResultAPI;
      if (res.result) {
        console.log("Delete Success")
        Swal.fire({
          icon: 'success',
          title: 'Delete Success!',
        })
          // Tiếp theo, chúng ta gọi phương thức navigate để chuyển hướng về trang cũ, giữ nguyên URL hiện tại
        this.router.navigateByUrl('/cart', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cart']);
        });
        await this.loadData();


      }
    } catch (err) {
      console.log(err);
    }
  }
}

}
