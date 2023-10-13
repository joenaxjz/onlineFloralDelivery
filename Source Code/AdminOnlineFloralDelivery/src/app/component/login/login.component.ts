
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/models/acount.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { AccountService } from "src/app/service/account.service";



@Component({
    selector:'app-root',
    templateUrl:'./login.component.html',

})

//interface laf implements
export class LoginComponnent implements OnInit{
    loginAccount!: FormGroup;
    account : Account;
    account2 : Account;
    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router: Router,
        ){}
    ngOnInit() {
        sessionStorage.clear();
        this.loginAccount = this.formBuilder.group({
            userName: ['',[
                Validators.required,
            ]],
            passWord: ['',[
                Validators.required,
            ]],
        })
    }

    loginForm(){
        var login: Account = this.loginAccount.value as Account
        console.log(login);
        this.accountService.login(login).then(
      res => {
        var resultApi: ResultAPI = res as ResultAPI;
        if (resultApi.result){
          sessionStorage.setItem('user', login.userName);
          var usernameadmin = sessionStorage.getItem('user');
          this.accountService.findNameSingle(usernameadmin).then(
            res => {
                this.account2 = res as Account;
                console.log(this.account2);
                if(this.account2.roleId<4){
                  alert('Success');
                 

                  sessionStorage.setItem('role', this.account2.roleId.toString());
                  sessionStorage.setItem('usernameAdmin', this.account2.userName);

                  //Tạo session Id account
                  sessionStorage.setItem('idAdmin', this.account2.accountId.toString());

                  //Cách lấy session id account(Lấy ra nó là kiểu chuỗi nha muốn kiểu kiểu thì xài Number(xyz gì đó))
                  console.log(sessionStorage.getItem('idAdmin'))

                  console.log(sessionStorage.getItem('role'))
                  console.log(sessionStorage.getItem('usernameAdmin'))
                  this.router.navigate(['/'])
                }else{
                  alert('Your account is not authorized');
                }
            },
            err => {
                console.log(err);
            }
        )

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
