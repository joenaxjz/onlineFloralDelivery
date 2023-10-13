
import { formatDate } from "@angular/common";
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "src/app/models/contact.model";
import { EventSale } from "src/app/models/event.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { ContactService } from "src/app/service/contact.service";

import { EventService } from "src/app/service/event.service";



@Component({
    selector:'app-root',
    templateUrl:'./detailcontact.component.html',

})

//interface laf implements
export class DetailContactComponent implements OnInit{

    ContactDetail : Contact;
    contactId : number;
    name : string;
    email : string;
    subject : string;
    message : string;
    created : Date;
    constructor(
        private formBuilder : FormBuilder,
        private router  : Router,
        private ContactSerive : ContactService,
        private ActivatedRoute: ActivatedRoute,
    ){}
    ngOnInit() {
        this.ActivatedRoute.paramMap.subscribe(p =>{
            var id = p.get('id');
            this.ContactSerive.findId(id).then(
                res => {
                    this.ContactDetail = res as Contact;
                    console.log(res);
                    this.contactId = this.ContactDetail.contactId;
                    this.name = this.ContactDetail.name;
                    this.email = this.ContactDetail.email;
                    this.subject = this.ContactDetail.subject;
                    this.message = this.ContactDetail.message;
                    this.created = this.ContactDetail.created;
                },
                err => {
                    console.log(err);
                }
            )
        });
    }
    delete() {
      alert('Are you sure you want to delete this contact?');
      console.log('delete')
    }
}
