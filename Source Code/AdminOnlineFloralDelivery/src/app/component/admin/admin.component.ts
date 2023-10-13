
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";



@Component({
    selector:'app-root',
    templateUrl:'./admin.component.html',

})

//interface laf implements
export class AdminComponnent implements OnInit{

    role : number;
    constructor(
        private router: Router,
        ){}
    ngOnInit() {
        this.role = Number(sessionStorage.getItem('role'))
        if(this.role == null || sessionStorage.getItem('role')==null){
            this.router.navigate(['/login'])
        }
    }
}
