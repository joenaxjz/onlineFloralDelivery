import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Comment } from "../models/commentbouquet.model";

@Injectable()
export class commentService {
    constructor(
        private baseURLService: BaseURLService,
    private httpClient: HttpClient
    ){

    }
  async findAllComment(){
    return await lastValueFrom (this.httpClient.get(this.baseURLService.getBaseUrl()+'comment/findAllComment'));
  }

  async findByBouquetId(boquetId : string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'comment/findByBouquetId/'+boquetId));
  }

  async addComment(comment:Comment){
    return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+'comment/addComment',comment));
  }

}
