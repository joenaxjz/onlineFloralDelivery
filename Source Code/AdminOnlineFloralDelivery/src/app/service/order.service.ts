import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()
export class OrderService {
    constructor(
        private BaseUrlService: BaseURLService,
        private HttpClient: HttpClient,
    ){}
    async findAll(){
        return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'order/findAll'));
    }

    async findByOrderIdAdmin(orderId: number){
      return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'order/findByOrderIdAdmin/'+orderId));
    }
}
