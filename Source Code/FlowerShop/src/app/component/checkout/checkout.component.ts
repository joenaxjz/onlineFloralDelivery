import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { Cart } from 'src/app/models/cart.model';
import { Delivery } from 'src/app/models/delivery.model';
import { OrderDetail } from 'src/app/models/orderdetail.model';
import { Orders } from 'src/app/models/orders.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { accountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { DeliveryService } from 'src/app/service/delivery.service';
import { OrderDetailService } from 'src/app/service/orderdetail.service';
import { OrdersService } from 'src/app/service/orders.service';
// paypal
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { enviroment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './checkout.component.html'
})
export class CheckOutComponent implements OnInit  {
  cartList: Cart[];
  totalAmount: number = 0;
  account: Account;
  deliveryForm: FormGroup;
  // order
  paymentMethod: string ='';
  // paypal
  public payPalConfig?: IPayPalConfig;
  showSuccess!: any;
  constructor(
    private cartService: CartService,
    private accountService: accountService,
    private ordersService: OrdersService,
    private orderDetailService: OrderDetailService,
    private deliveryService: DeliveryService,
    private router: Router,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe
  ){

  }
  ngOnInit(){
    var userName = sessionStorage.getItem('username');
    this.cartService.findByAccountName(userName).then(
      result => {
        this.cartList = result as Cart[];
        this.calculateTotalAmount();
      }
    )

    this.deliveryForm = this.formBuilder.group({
      recipientName: [''],
      recipientAddress: [''],
      recipientPhone: [''],
      message: [''],
    });

    // paypal
    this.initConfig();
  }

  calculateTotalAmount() {
    this.totalAmount = 0; // Reset lại tổng tiền
    if (this.cartList) {
      for (const cart of this.cartList) {
        this.totalAmount += cart.totalPrice;
      }
    }
  }
  onPaymentMethodChange(event: Event) {
    if (!event) {
      this.paymentMethod = 'transfer';
    } else {
      const selectElement = event.target as HTMLSelectElement;
      this.paymentMethod = selectElement.value;
    }
  }

  async complete(totalAmount: number){

    if(new Date().getHours() >= 19){
      var totalOrder = totalAmount;
      var userName = sessionStorage.getItem('username');
      try {
        const result = await this.accountService.findAccountIdByUsername(userName);
        this.account = result as Account;

        if (sessionStorage.getItem('username') != null) {
         // Lấy danh sách đơn hàng từ dịch vụ
        const ordersList = await this.ordersService.findAll() as Orders[];
        // Khởi tạo biến lưu giá trị orderId lớn nhất
        let maxOrderId = 0;
        // Duyệt qua danh sách đơn hàng và tìm orderId lớn nhất
        for (const order of ordersList) {
          if (order.orderId > maxOrderId) {
            maxOrderId = order.orderId+1;
          }
        }
          const orders: Orders = {
            paymentMethod: this.paymentMethod  || 'transfer',
            totalOrder: totalOrder,
            status: '0',
            accountId: this.account.accountId,
            orderId: 0
          };
          console.log(orders);
         await this.ordersService.created(orders).then(
            result =>{
              console.log(result);
              var resultAPI: ResultAPI  = result as ResultAPI;
            }
          )
          Swal.fire({
            icon: 'success',
            title: 'Order Success!',
          })
          console.log(maxOrderId);

          let hhTimeNextDay = Number(this.datepipe.transform(new Date("Fri Dec 08 2019 11:59:59"), 'hh'));
          let mmTimeNextDay = Number(this.datepipe.transform(new Date("Fri Dec 08 2019 11:59:59"), 'mm'));
          let ssTimeNextDay = Number(this.datepipe.transform(new Date("Fri Dec 08 2019 11:59:59"), 'ss'));
          let hhTimeNow = Number(this.datepipe.transform(new Date(), 'hh'));
          let mmTimeNow = Number(this.datepipe.transform(new Date(), 'mm'));
          let ssTimeNow = Number(this.datepipe.transform(new Date(), 'ss'));
          // console.log('So giay can phai chay den cuoi ngay : ' + ((hhTimeNextDay-hhTimeNow)*3600+(mmTimeNextDay-mmTimeNow)*60+(ssTimeNextDay-ssTimeNow)))
          let TotalSecond = ((hhTimeNextDay-hhTimeNow)*3600+(mmTimeNextDay-mmTimeNow)*60+(ssTimeNextDay-ssTimeNow));
          await setTimeout(() => {
            console.log('b');
            this.ordersService.updateOrderStatus(maxOrderId).then(
              result => {
                console.log(result);
                var resultAPI: ResultAPI = result as ResultAPI;
              },
              err => {
                console.log(err);
              }
            );
          }, 1000*(60*60*14+1+TotalSecond));
          // tạo  ra list orderdetail
          const orderDetails: OrderDetail[] = this.cartList.map(cart => {
            return {
              orderId: maxOrderId,
              bouquetId: cart.bouquetId,
              quantity: cart.quantity,
              totalPrice: cart.totalPrice
            };
          });
        // Thêm danh sách orderDetails vào cơ sở dữ liệu
        console.log(orderDetails);
        this.orderDetailService.created(orderDetails);
        // thêm delivery vào
        const recipientName = this.deliveryForm.get('recipientName').value;
        const recipientAddress = this.deliveryForm.get('recipientAddress').value;
        const recipientPhone = this.deliveryForm.get('recipientPhone').value;
        const message = this.deliveryForm.get('message').value;
          const delivery: Delivery = {
            orderId: maxOrderId,
            recipientName: recipientName,
            recipientAddress: recipientAddress,
            recipientPhone: recipientPhone,
            message: message
          }
          this.deliveryService.created(delivery);
          this.cartService.deleteByAccountId(this.account.accountId);
          this.router.navigate(['/orderdetail']);
        } else {
          this.router.navigate(['/login']);
        }
      } catch (err) {
        console.log(err);
      }

    }else{
      var totalOrder = totalAmount;
      var userName = sessionStorage.getItem('username');
      try {
        const result = await this.accountService.findAccountIdByUsername(userName);
        this.account = result as Account;

        if (sessionStorage.getItem('username') != null) {
         // Lấy danh sách đơn hàng từ dịch vụ
        const ordersList = await this.ordersService.findAll() as Orders[];
        // Khởi tạo biến lưu giá trị orderId lớn nhất
        let maxOrderId = 0;
        // Duyệt qua danh sách đơn hàng và tìm orderId lớn nhất
        for (const order of ordersList) {
          if (order.orderId > maxOrderId) {
            maxOrderId = order.orderId+1;
          }
        }
          const orders: Orders = {
            paymentMethod: this.paymentMethod  || 'transfer',
            totalOrder: totalOrder,
            status: '0',
            accountId: this.account.accountId,
            orderId: 0
          };
          console.log(orders);
         await this.ordersService.created(orders).then(
            result =>{
              console.log(result);
              var resultAPI: ResultAPI  = result as ResultAPI;
            }
          )
          Swal.fire({
            icon: 'success',
            title: 'Order Success!',
          })
          console.log(maxOrderId);
          await setTimeout(() => {
            console.log('a');
            this.ordersService.updateOrderStatus(maxOrderId).then(
              result => {
                console.log(result);
                var resultAPI: ResultAPI = result as ResultAPI;
              },
              err => {
                console.log(err);
              }
            );
          }, 20000);
          // tạo  ra list orderdetail
          const orderDetails: OrderDetail[] = this.cartList.map(cart => {
            return {
              orderId: maxOrderId,
              bouquetId: cart.bouquetId,
              quantity: cart.quantity,
              totalPrice: cart.totalPrice
            };
          });
        // Thêm danh sách orderDetails vào cơ sở dữ liệu
        console.log(orderDetails);
        this.orderDetailService.created(orderDetails);
        // thêm delivery vào
        const recipientName = this.deliveryForm.get('recipientName').value;
        const recipientAddress = this.deliveryForm.get('recipientAddress').value;
        const recipientPhone = this.deliveryForm.get('recipientPhone').value;
        const message = this.deliveryForm.get('message').value;
          const delivery: Delivery = {
            orderId: maxOrderId,
            recipientName: recipientName,
            recipientAddress: recipientAddress,
            recipientPhone: recipientPhone,
            message: message
          }
          this.deliveryService.created(delivery);
          this.cartService.deleteByAccountId(this.account.accountId);
          this.router.navigate(['/orderdetail']);
        } else {
          this.router.navigate(['/login']);
        }
      } catch (err) {
        console.log(err);
      }

    }

  }


  // paypal()
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: `${enviroment.Client_ID}`,
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: `${this.totalAmount}`,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: `${this.totalAmount}`
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: `${this.totalAmount}`,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
