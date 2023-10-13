
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Category } from "src/app/models/category.models";
import { CategoryService } from "src/app/service/cateogry.service";



@Component({
    selector:'app-root',
    templateUrl:'./categories.component.html',

})

//interface laf implements
export class CategoriesComponnent implements OnInit{
  category: Category[];

  constructor(

    private categoryService: CategoryService,
    private router: Router
  ){}

    ngOnInit() {
      this.categoryService.findAll().then(resutl =>{
        this.category = resutl as Category[];
        console.log("Category",this.category);
      },
      err =>{
        console.log(err);
      }
      );



    }
}
