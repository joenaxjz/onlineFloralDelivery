import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Bouquet } from "src/app/models/bouquet.model";
import { Category } from "src/app/models/category.models";
import { BouquetSerice } from "src/app/service/bouquet.service";
import { CategoryService } from "src/app/service/cateogry.service";

@Component({
    selector:'app-root',
    templateUrl:'./bouquet.component.html',

})

//interface laf implements
export class BouquetComponnent implements OnInit{

  bouquet?: Bouquet[];
  category: Category[];
  activeBouquet!: string;
  constructor(
    private bouquetService: BouquetSerice,
    private categoryService: CategoryService,
    private router: Router
  ){}
    ngOnInit() {
      this.bouquetService.findAll().then(
        result => {

          this.bouquet = result as Bouquet[];
          console.log(this.bouquet);
        },
        error =>{
          console.log(error);
        }
      );

      this.categoryService.findAll().then(
        result => {
          this.category = result as Category[];
        },
        err => {
          console.log(err);
        }
      )
    }


    // select thoe status
    selectBouquet(evt: any){
      var activeBouquet = evt.target.value;
        this.bouquetService.findByStatus(activeBouquet).then(
          result => {
            this.bouquet = result as Bouquet[];

          },err =>{
            console.log(err);
          }
        )
    }
      // select thoe category
    selectCategory(evt:any){
    var categoryId = evt.target.value;
     this.bouquetService.findByCategoryId(categoryId).then(
      result =>{
        this.bouquet = result as Bouquet[];
      },
      err =>{
        console.log(err);
      }
    )
    }


}
