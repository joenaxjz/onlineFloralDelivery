
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/models/category.models";
import { ResultAPI } from "src/app/models/resultapi.model";
import { CategoryService } from "src/app/service/cateogry.service";



@Component({
    selector:'app-root',
    templateUrl:'./categorybouquet.component.html',

})

//interface laf implements
export class EditCategorybouquetComponnent implements OnInit{
  editFormCategory!: FormGroup;
  category: Category;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

  }
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(p=>{
        var categoryId = p.get('categoryId');
        console.log(categoryId);
        this.categoryService.findById(categoryId!).then(
          result => {
            this.category = result as Category;
            this.editFormCategory = this.formBuilder.group({
              categoryId: this.category.categoryId,
              categoryName: this.category.categoryName,
              created: this.category.created
            })
          },
          err => {
            console.log(err);
          }
        )
      })
    }

    save(){
      var category: Category = this.editFormCategory.value as Category;
      category.categoryId = this.category.categoryId;
      console.log(category);
      this.categoryService.update(category).then(
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
