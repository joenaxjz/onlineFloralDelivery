import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { Contact } from "../models/contact.model";
import { lastValueFrom } from "rxjs";

@Injectable()
export class contactService {
    constructor(
        private baseURLService: BaseURLService,
    private httpClient: HttpClient
    ){

    }
    async create(contact: Contact){
        return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'contact/addnew/', contact));
      }
}
