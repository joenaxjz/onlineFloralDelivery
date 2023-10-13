import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Bouquet } from "../models/bouquet.model";

@Injectable()
export class BouquetSerice{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findall'));
}
async findByStatus(status: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByStatus/'+status));
}

async findByCategoryId(categoryId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByCategoryId/'+categoryId));
}

async findById(bouquetId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findById/'+bouquetId));
}

async findByBouquetName(bouquetName: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByBouquetName/'+bouquetName));
}
async created(bouquet: Bouquet){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+'bouquet/created',bouquet));
}


async update(bouquet: Bouquet){
  // tra ve duong dan goc http://localhost:5182/api/
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+'bouquet/update',bouquet));
}


}
