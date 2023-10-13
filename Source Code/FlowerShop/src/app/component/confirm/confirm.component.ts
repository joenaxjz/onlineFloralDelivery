import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { accountService } from 'src/app/service/account.service';
import { Confirm } from 'src/app/models/confirm.model';

@Component({
  selector: 'app-root',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit  {

  ConfirmForm : FormGroup;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private accountService: accountService,
  ){}
  ngOnInit() {
      this.ConfirmForm = this.formBuilder.group({
          inputcode: '',
      })
  }
  confirm() {
      // console.log(sessionStorage.getItem('codeConfirm'));
      // console.log(sessionStorage.getItem('userName'));
      // console.log(sessionStorage.getItem('email'));
      // console.log(sessionStorage.getItem('phone'));
      // console.log(sessionStorage.getItem('dob'));
      // console.log(sessionStorage.getItem('address'));
      // console.log(sessionStorage.getItem('imageUrl'));
      // console.log(valuecode.inputcode);
      // console.log(sessionStorage.getItem('codeConfirm'));
      var valuecode: Confirm = this.ConfirmForm.value as Confirm
      if(valuecode.inputcode == sessionStorage.getItem('codeConfirm')){//
          this.accountService.updateStatus(sessionStorage.getItem('UsernameConfirm')).then(
              res => {
                  var resultApi: ResultAPI = res as ResultAPI;
                  this.router.navigate(['/login']);
              },
              err => {
                console.log(err);
            }
            )
      }else{
          alert('Nhap sai');
      }

  }
}
