
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
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
export class AddBouquetComponnent implements OnInit{
  addBouquetForm!: FormGroup;
  category: Category[];
  constructor(
    private formBuilder: FormBuilder,
    private bouquetService: BouquetSerice,
    private categoryService: CategoryService,
    private router: Router,

    ) { }

    ngOnInit() {
      this.categoryService.findAll().then(
        result => {
          this.category = result as Category[];
        },
        err => {
          console.log(err);
        }
      )

      this.addBouquetForm = this.formBuilder.group({
        // Khởi tạo các FormControl trong FormGroup
        bouquetName: '',
        description: '',
        price: 0,
        quantity: 0,
        categoryId: 0,
        status: true
      });
    }

    save() {
      console.log('Information bouquet');
      var bouquet: Bouquet = this.addBouquetForm.value as Bouquet;
      console.log(bouquet);

      this.bouquetService.created(bouquet).then(
        result => {
          console.log(result);
          var resultAPI: ResultAPI = result as ResultAPI;
          if (resultAPI.result) {
            // sử dụng router để redirect về
            alert('Success');
            this.router.navigate(['/admin/bouquet']);
          } else {
            alert('Failed');
          }
        },
        err => {
          console.log(err);
        }
      );
    }
}
