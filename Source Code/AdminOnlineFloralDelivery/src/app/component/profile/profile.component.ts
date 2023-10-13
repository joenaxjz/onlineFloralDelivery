
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/models/acount.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { AccountService } from "src/app/service/account.service";



@Component({
    selector:'app-root',
    templateUrl:'./profile.component.html',

})

//interface laf implements
export class ProfileComponnent implements OnInit{

    Account : Account;
    EditProfileForm: FormGroup;
    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router: Router,
        ){}
    ngOnInit() {

        var usernameadmin = sessionStorage.getItem('user');
        this.accountService.findNameSingle(usernameadmin).then(
          res => {
                this.Account = res as Account;
                this.EditProfileForm = this.formBuilder.group({
                    accountId : this.Account.accountId,
                    username : this.Account.userName,
                    password : null,
                    email : this.Account.email,
                    phone : this.Account.phone,
                    address : this.Account.address,
                    imageUrl : this.Account.imageUrl,
                    roleId: this.Account.roleId,
                    created : this.Account.created,
                    dob : this.Account.dob,
                    status : this.Account.status,
                })
          },
          err => {
              console.log(err);
          }
        );
        this.EditProfileForm = this.formBuilder.group({
            username:['',[
                Validators.required,
            ]],
            password:null,
            email:['',[
                Validators.required,
            ]],
            phone:['',[
                Validators.required,
            ]],
            dob : '',
            address : '',
            imageUrl : '',
            roleId: '',
            created : '',
            status : '',
        })
    }
    save(){
        var acc : Account = this.EditProfileForm.value as Account;
        console.log(acc.created);
        console.log(acc.dob);
        console.log(acc);

            var formData = new FormData();
            formData.append('strAccount',JSON.stringify(acc));
            this.accountService.updateAccount(formData).then(
                res =>{
                    alert('Success')
                    // this.router.navigate(['/admin/event'])
                },
                err =>{
                    console.log(err);
                    alert('Failed 2')
                }
            );
        }



}
