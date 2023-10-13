
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Category } from "src/app/models/category.models";
import { ResultAPI } from "src/app/models/resultapi.model";
import { CategoryService } from "src/app/service/cateogry.service";



@Component({
    selector:'app-root',
    templateUrl:'./categorybouquet.component.html',

})

//interface laf implements
export class AddCategorybouquetComponnent implements OnInit{
    addCategoryForm!: FormGroup;
    constructor(
      private formBuilder: FormBuilder,
      private categoryService: CategoryService,
      private router: Router,
    ){

    }
    ngOnInit() {

      this.addCategoryForm = this.formBuilder.group({
        categoryName: '',
      });
    }

    save() {
      console.log('Information bouquet');
      var category: Category = this.addCategoryForm.value as Category;
      console.log(category);

      this.categoryService.created(category).then(
        result => {
          console.log(result);
          var resultAPI: ResultAPI = result as ResultAPI;
            alert('Success');
            this.router.navigate(['/admin/categories']);
        },
        err => {
          console.log(err);
        }
      );
    }
}
