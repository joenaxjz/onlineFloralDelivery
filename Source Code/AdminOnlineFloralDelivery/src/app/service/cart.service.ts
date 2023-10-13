import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";


@Injectable()
export class CartService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'cart/findAllCart'));
}

}
