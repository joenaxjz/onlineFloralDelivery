import { OrderDetail2 } from "./orderdetail2.model";


export class ListOrderDetail{
  orderId: number;
  accountId: number;
  paymentMethod: string;
  totalOrder: number;
  orderDate: string;
  orderTime: string;
  status: number;
  username: string;
  orderDetails: OrderDetail2[];
}
