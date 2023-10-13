import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()
export class EventService {
    constructor(
        private BaseUrlService: BaseURLService,
        private HttpClient: HttpClient,
    ){}

    async findStatus(){
        return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'event/findEventIsAction'));
    }

    async findEventIsActionUser(){
      return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'event/findEventIsActionUser'));
  }
  async findEvenUserDealOfMonth(){
    return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'event/findEvenUserDealOfMonth'));
}
}
