import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";


@Injectable()
export class ContactService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

    async findAll(){
        return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'contact/showAll'));
    }
    async findId(id : string){
        return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'contact/Detail/'+id));
    }
    async reply(FormData: FormData){
        return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+'contact/reply/',FormData));
    }
}
