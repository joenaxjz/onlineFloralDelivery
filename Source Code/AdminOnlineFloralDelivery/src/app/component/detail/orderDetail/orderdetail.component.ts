import { Component, OnInit ,} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Bouquet } from "src/app/models/bouquet.model";
import { Category } from "src/app/models/category.models";
import { ListOrderDetail } from "src/app/models/listorderdetail.model";
import { BouquetSerice } from "src/app/service/bouquet.service";
import { CategoryService } from "src/app/service/cateogry.service";
import { OrderService } from "src/app/service/order.service";

@Component({
    selector:'app-root',
    templateUrl:'./orderdetail.component.html',

})

//interface laf implements
export class OrderDetailComponent implements OnInit{
  listOrderDetail: ListOrderDetail[]=[];
  bouquet?: Bouquet[];
  category: Category[];
  activeBouquet!: string;
  keywordBouquetId: string;
  constructor(
    private bouquetService: BouquetSerice,
    private cateogryService: CategoryService,
    private orderService: OrderService,
    private activatedRoute : ActivatedRoute,
    private router: Router
  ){}
    async ngOnInit() {
      try{
        this.activatedRoute.paramMap.subscribe(p=>{
          var orderIdStr = p.get('orderId'); // Lấy giá trị orderId dưới dạng chuỗi
          var orderId = Number(orderIdStr);
          console.log(orderId);
           this.orderService.findByOrderIdAdmin(orderId).then(
            result =>{
              this.listOrderDetail = result as ListOrderDetail[];
            }
          )
            console.log(this.listOrderDetail);
        })
      }catch(err){
         console.log(err);
      }


    }


}
