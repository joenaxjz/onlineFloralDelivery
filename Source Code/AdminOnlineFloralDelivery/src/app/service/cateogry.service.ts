import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import {HttpClient} from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Category } from "../models/category.models";

@Injectable()
export class CategoryService{

 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

async findAll(){
  // tra ve duong dan goc http://localhost:5182/api/
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'category/findAllCategories'));
}

async created(category: Category){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+'category/addCategories',category));
}

async findById(categoryId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'category/SearchCategoriesId/'+categoryId));
}

async update(category: Category){
  // tra ve duong dan goc http://localhost:5182/api/
  return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl()+'category/updateCategory',category));
}
}
