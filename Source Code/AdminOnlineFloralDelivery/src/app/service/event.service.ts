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
    async findAll(){
        return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'event/findallevent'));
    }
    async findId(id : string){
        return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'event/SearchEventId/'+id));
    }
    async findStatus(status : string){
        return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'event/findEventIsAction/'+status));
    }
    async findName(keyword : string){
        return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'event/searchEventName/'+keyword));
    }
    async create(FormData: FormData){
        return await lastValueFrom(this.HttpClient.post(this.BaseUrlService.getBaseUrl()+'event/addEvent/',FormData));
    }
    async update(FormData: FormData){
        return await lastValueFrom(this.HttpClient.put(this.BaseUrlService.getBaseUrl()+'event/updateEvent',FormData));
    }

}
