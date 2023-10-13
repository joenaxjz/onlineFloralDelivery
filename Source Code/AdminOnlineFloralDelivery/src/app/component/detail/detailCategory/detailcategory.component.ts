import { Component, OnInit ,} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Bouquet } from "src/app/models/bouquet.model";
import { Category } from "src/app/models/category.models";
import { BouquetSerice } from "src/app/service/bouquet.service";
import { CategoryService } from "src/app/service/cateogry.service";

@Component({
    selector:'app-root',
    templateUrl:'./detailcategory.component.html',

})

//interface laf implements
export class DetailCategoryComponent implements OnInit{

  bouquet?: Bouquet[];
  category: Category[];
  activeBouquet!: string;
  keywordBouquetId: string;
  constructor(
    private bouquetService: BouquetSerice,
    private cateogryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}
    ngOnInit() {

      this.activatedRoute.paramMap.subscribe(p=>{
        var categoryId = p.get('categoryId');
        console.log(categoryId);
        this.bouquetService.findByCategoryId(categoryId!).then(
          result => {
            this.bouquet = result as Bouquet[];
          },
          err => {
            console.log(err);
          }
        )
      })
    }


}
