import { Injectable } from "@angular/core";

@Injectable()
export class BaseURLService{
  private BASE_URL: string = "http://localhost:5121/api/";
  getBaseUrl(): string{
    return this.BASE_URL;
  }
}
