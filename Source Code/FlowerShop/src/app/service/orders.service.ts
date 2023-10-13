import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import {HttpClient} from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Orders } from "../models/orders.model";

@Injectable()
export class OrdersService{

 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async created(orders: Orders){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'order/created/', orders));
}

async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'order/findall'));
}

async findByAccountId(accountId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'order/findByAccountId/'+accountId));
}

async findByAccountId2(accountId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'order/findByAccountId2/'+accountId));
}

async updateOrderStatus(orderId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'order/updateOrderStatus/'+orderId));
}
}
