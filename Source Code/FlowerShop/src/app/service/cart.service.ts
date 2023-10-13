import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Cart } from "../models/cart.model";


@Injectable()
export class CartService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async findByAccountName(accountName: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'cart/findByAccountName/'+accountName));
}

async created(cart: Cart){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'cart/addCart/', cart));
}

async delete(cartId: string){
  return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl()+'cart/deleteCart/'+cartId));
}

async update(cart: Cart){
  return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl()+'cart/updateCart',cart));
}

async finByCartId(cartId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'cart/findByCartId/'+cartId));
}

async deleteByAccountId(accountId: number){
  return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl()+'cart/deleteCartByAccountId/'+accountId));
}

}
