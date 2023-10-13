
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Contact } from "src/app/models/contact.model";
import { EventSale } from "src/app/models/event.model";
import { ContactService } from "src/app/service/contact.service";
import { EventService } from "src/app/service/event.service";


@Component({
    selector:'app-root',
    templateUrl:'./contact.component.html',
})

//interface laf implements
export class ContactComponnent implements OnInit{
    ContactList : Contact[];
    page : number;
    constructor(
        private ContactService: ContactService,
        private router : Router,
    ){}
    ngOnInit() {
        this.page = 1;
        console.log(this.page);
        this.ContactService.findAll().then(
            result => {
              this.ContactList = result as Contact[];
              console.log(this.ContactList);
            },
            error =>{
              console.log(error);
            }
          )
    }
    previousPage(){
      if(this.page >1){
        this.page = this.page -1;
      }
    }
    nextPage(){
        if(this.page<this.ContactList.length/5){
            this.page = this.page +1;
        }


    }
}
