import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { accountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './myprofile.component.html'
})
export class MyProfileComponent implements OnInit  {
  updateAccountUser: FormGroup;
  account: Account;
  imageUrl: File;
  url: any = null;
    constructor(
      private accountService: accountService,
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ){

  }
    ngOnInit(){
      this.updateAccountUser = this.formBuilder.group({
        accountId: '',
        userName: '',
        roleName: '',
        created: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        password: '',
        status: ''
      }),

      this.activatedRoute.paramMap.subscribe(acc => {
        var usernameProfile =  acc.get('Username')
      this.accountService.findUsername(usernameProfile).then(
        res => {
          this.account = res as Account;

          console.log(this.account, this.account.passWord);
          this.updateAccountUser = this.formBuilder.group({
            accountId: this.account.accountId,
            userName: this.account.userName,
            password: this.account.passWord,
            roleId: 4,
            created: this.account.created,
            email: this.account.email,
            phone: this.account.phone,
            address: this.account.address,
            dob: this.account.dob,
            status: true,

          })
          this.url = this.account.imageUrl;
        }, err => {
          console.log(err)
        }
      )
    })}

    update(){
      var account: Account = this.updateAccountUser.value as Account;
      var formData = new FormData();
      account.accountId = this.account.accountId;
      if(this.imageUrl!=null){
        console.log(this.imageUrl);
          formData.append('imageUrl', this.imageUrl);
      }
      formData.append('strAccount', JSON.stringify(account));
      this.accountService.update(formData).then(
          res => {
            console.log(res);
            this.router.navigate(['/home']);
            alert('Update Successed')

          },
          err => {
              console.log(err);
          }
      );
    }

    selectPhoto(evt: any){
      this.imageUrl = evt.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.imageUrl);
      reader.onload = (_image) => {
        this.url = reader.result;
      }
  }
  }

