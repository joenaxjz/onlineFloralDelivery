import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";


@Injectable()
export class CommentService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'comment/findAllComment'));
}

async findByBouquetId(boquetId : string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'comment/findByBouquetId/'+boquetId));
}

async delete(commentId: string){
  return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl()+'comment/deleteComment/'+commentId));
}

}
