import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Delivery } from "../models/delivery.model";


@Injectable()
export class DeliveryService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}


async created(delivery: Delivery){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'delivery/created/', delivery));
}

}
