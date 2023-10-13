import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { accountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit  {

  loginAccount: FormGroup;
  constructor(
      private accountService: accountService,
      private formBuilder: FormBuilder,
      private router: Router,
      ){}
  ngOnInit() {
      this.loginAccount = this.formBuilder.group({
          userName: '',
          passWord: '',
      })
  }

  loginForm(){
      var login: Account = this.loginAccount.value as Account
      console.log(login);
      this.accountService.login(login).then(
    res => {
      var resultApi: ResultAPI = res as ResultAPI;
      if (resultApi.result){
        sessionStorage.setItem('username', login.userName);

        this.router.navigate(['/home']);
        Swal.fire({
          icon: 'success',
          title: 'Login Success!',
        })
      } else {
        alert('Failed');
      }
    },
    err => {
      console.log(err);
  }

  )
  }

}
