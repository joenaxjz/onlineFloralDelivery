
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Bouquet } from "src/app/models/bouquet.model";
import { Category } from "src/app/models/category.models";
import { ResultAPI } from "src/app/models/resultapi.model";
import { BouquetSerice } from "src/app/service/bouquet.service";
import { CategoryService } from "src/app/service/cateogry.service";

@Component({
    selector:'app-root',
    templateUrl:'./bouquet.component.html',

})

//interface laf implements
export class EditBouquetComponnent implements OnInit{

    ngOnInit() {


    }
    
}
