import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { accountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit  {

  registerAccount!: FormGroup;
  codeRandom?: number;

  constructor(
      private accountService: accountService,
      private formBuilder: FormBuilder,
      private router: Router,
      ){}

  ngOnInit() {
      this.registerAccount! = this.formBuilder.group({
          userName: '',
          passWord: '',
          email: '',
          phone: '',
          address: '',
          imageUrl: 'null',
          roleId: 4,
          dob: '',
          status: false,
      })

  }

  save(){
    this.codeRandom = Math.floor((Math.random() * (999999 - 100000)) + 100000);
      var register: Account = this.registerAccount.value as Account
      var codeConfirm = this.codeRandom.toString();
        this.accountService.create(codeConfirm,register).then(
          res => {
          console.log(register);
          var resultApi: ResultAPI = res as ResultAPI;
          if (resultApi.result){
            Swal.fire({
              icon: 'success',
              title: '',
            })
            this.router.navigate(['/confirm']);
            sessionStorage.setItem('codeConfirm', codeConfirm);
            sessionStorage.setItem('UsernameConfirm', register.userName);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Account already exists',
            })
          }
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: '',
          })
          console.log(err);
      }

      )




  }
}

