import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Bouquet } from "src/app/models/bouquet.model";
import { Category } from "src/app/models/category.models";
import { BouquetSerice } from "src/app/service/bouquet.service";
import { CategoryService } from "src/app/service/cateogry.service";

@Component({
    selector:'app-root',
    templateUrl:'./detailevent.component.html',

})

//interface laf implements
export class DetailEventComponent implements OnInit{

  bouquet?: Bouquet[];
  category: Category[];
  activeBouquet!: string;
  keywordBouquetId: string;
  constructor(
    private bouquetService: BouquetSerice,
    private cateogryService: CategoryService,
    private router: Router
  ){}
    ngOnInit() {

    }


}
