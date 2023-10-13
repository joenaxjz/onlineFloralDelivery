import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Account } from "../models/acount.model";
import { Delivery } from "../models/delivery.model";


@Injectable()
export class DeliveryService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}


 async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'delivery/findAll'));
}

}
