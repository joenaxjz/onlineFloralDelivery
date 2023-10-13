import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Account } from "../models/acount.model";


@Injectable()
export class AccountService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}


 async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'account/showAll'));
}
async findName(keyword : string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'account/search/'+keyword));
}
async create(account: Account){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'account/registerAccount/', account));
}

async login(account: Account){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'account/login/', account));
}
async updateStatus(Username : string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'account/updateStatus/'+Username));
}
async updateStatus2(Username : string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'account/updateStatus2/'+Username));
}
async findNameSingle(keyword : string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'account/findUsername/'+keyword));
}
async updateAccount(FormData: FormData){
  return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl()+'account/updateAccount',FormData));
}

}
