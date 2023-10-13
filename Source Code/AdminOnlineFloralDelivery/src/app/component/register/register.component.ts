import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/models/acount.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { AccountService } from "src/app/service/account.service";



@Component({
    selector:'app-root',
    templateUrl:'./register.component.html',

})

//interface laf implements
export class RegisterComponnent implements OnInit{

    registerAccount!: FormGroup;
    role : string = "2";
    roleSession : number;
    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router: Router,
        ){}
    ngOnInit() {
        this.roleSession = Number(sessionStorage.getItem('role'))
        if(this.roleSession == null || sessionStorage.getItem('role')==null || this.roleSession != 1){
            this.router.navigate(['/login'])
        }
        this.registerAccount = this.formBuilder.group({
            userName: '',
            passWord: '',
            email: '',
            phone: '',
            address: '',
            imageUrl: 'null',
            roleId: 2,
            dob: '',
            status: true,
        })
    }
    save(){
          var register: Account = this.registerAccount.value as Account
          register.roleId = Number(this.role);
          this.accountService.create(register).then(
          res => {
          console.log(register);
          var resultApi: ResultAPI = res as ResultAPI;
          if (resultApi.result){
            this.router.navigate(['/admin/roleadmin']);
            alert('Success')
          } else {
            alert('Username already exists 1');
          }
        },
        err => {
            alert('Username already exists 2');
          console.log(err);
      }
      )
    }
    selectRole(evt : any){
        this.role = evt.target.value;
    }
}
