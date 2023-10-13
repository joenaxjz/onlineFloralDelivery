import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { contactService } from 'src/app/service/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit  {
  addContactForm!: FormGroup;

  constructor(
    private contactService: contactService,
    private formBuilder: FormBuilder,
    private router: Router,
    ){}
  ngOnInit(){
    this.addContactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      subject: [''],
      message: ['', Validators.required]
    })
  }

  save(){
    var contact: Contact = this.addContactForm.value as Contact;
    console.log(contact);
    this.contactService.create(contact).then(
      res => {
        console.log(contact);
        var resultApi: ResultAPI = res as ResultAPI;
        if (resultApi.result){
          Swal.fire({
            icon: 'success',
            title: 'Success!',
          })
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
          })
        }
      },
      err => {
        console.log(err);
    }

    )
  }
}
