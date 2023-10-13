import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Bouquet } from "../models/bouquet.model";

@Injectable()
export class bouquetService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async findNewBouquet(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findnewbouquet'));
}

async findFavoriteBouquet(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findfavoritebouquet'));
}

async findCategoryIdBouquet(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findcategoryidbouquet'));
}

async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findall'));
}

async findByCategoryId(categoryId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByCategoryId/'+categoryId));
}

async findByPrice(price: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByPriceRange/'+price));
}

async findByEventId(eventId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByEventId/'+eventId));
}

async findByFavorite(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findfavoritebouquet'));
}

async findByBouquetId(bouquetId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByBouquetId/'+bouquetId));
}
}
