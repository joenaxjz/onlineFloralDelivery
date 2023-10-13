import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { Contact } from "../models/contact.model";
import { lastValueFrom } from "rxjs";
import { Account } from "../models/account.model";

@Injectable()
export class accountService {
    constructor(
        private baseURLService: BaseURLService,
    private httpClient: HttpClient
    ){

    }
    async create(codeConfirm: string, account: Account){
      return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'account/register/'+codeConfirm, account));
  }

  async login(account: Account){
      return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'account/login/', account));
  }

  async updateStatus(Username : string){
      return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'account/updateStatus/'+Username));
  }

  async findAccountIdByUsername(username: string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'account/findAccountIdByUsername/'+username));
  }
  async findUsername(Username: string) {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'account/findUsername/' + Username));
}
  async update(formData: FormData){
    return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl()+ 'account/update', formData));
  }
}
