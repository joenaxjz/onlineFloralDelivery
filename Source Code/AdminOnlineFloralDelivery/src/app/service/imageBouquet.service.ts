import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import {HttpClient} from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Imagebouquet } from "../models/imageboquet.model";

@Injectable()
export class ImageBouquetService{

 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async created(FormData: FormData){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+'image/created',FormData));
}


async findAll(){
  // tra ve duong dan goc http://localhost:5182/api/
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'image/findall'));
}
async update(FormData: FormData){
  return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl()+'image/update',FormData));
}
async delete(id : string){
  return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl()+'image/delete/'+id));
}
async findbyid(bouquetId: string){
  // tra ve duong dan goc http://localhost:5182/api/
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'image/findById/'+bouquetId));
}

}
