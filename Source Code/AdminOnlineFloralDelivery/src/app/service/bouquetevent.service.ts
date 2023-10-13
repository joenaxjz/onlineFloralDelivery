import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BouquetEvent } from "../models/bouquetevent.model";


@Injectable()
export class BouquetEventSerice{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}


async findByEventId(eventid: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquetevent/findByEventId/'+eventid));
}

async created(bouquetevent: BouquetEvent){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+'bouquetevent/created',bouquetevent));
}

async delete(bouquetId: string){
  return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl()+'bouquetevent/delete/'+bouquetId));
}

}

