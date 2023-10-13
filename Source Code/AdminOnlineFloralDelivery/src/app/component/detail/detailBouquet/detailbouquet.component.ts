import { Component, OnInit ,} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Bouquet } from "src/app/models/bouquet.model";
import { Category } from "src/app/models/category.models";
import { CommentBouquet } from "src/app/models/comment.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { BouquetSerice } from "src/app/service/bouquet.service";
import { CategoryService } from "src/app/service/cateogry.service";
import { CommentService } from "src/app/service/comment.service";

@Component({
    selector:'app-root',
    templateUrl:'./detailbouquet.component.html',

})

//interface laf implements
export class DetailBouquetComponent implements OnInit{

  bouquet?: Bouquet;
  commentbouquet: CommentBouquet[];

  constructor(
    private bouquetService: BouquetSerice,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(p=>{
        var bouquetId = p.get('bouquetId');
        console.log(bouquetId);
        this.bouquetService.findById(bouquetId!).then(
          result => {
            this.bouquet = result as Bouquet;
            console.log(this.bouquet);
            this.formBuilder.group({
                bouquetId: this.bouquet.bouquetId,
                bouquetName: this.bouquet.bouquetName,
                description: this.bouquet.description,
                price: this.bouquet.price,
                quantity: this.bouquet.quantity,
                categoryId: this.bouquet.categoryId,
                categoryName: this.bouquet.categoryName,
                status: this.bouquet.status,
                secondPrice: this.bouquet.secondPrice,
                eventPrice: this.bouquet.eventPrice,
                created:this.bouquet.created
            })
          },
          err => {
            console.log(err);
          }
        )
      })

  // Theo dõi thay đổi của tham số 'bouquetId' từ đường dẫn
   this.activatedRoute.paramMap.subscribe(p => {
    var bouquetId = p.get('bouquetId');
    this.commentService.findByBouquetId(bouquetId).then(resutl =>{
      this.commentbouquet = resutl as CommentBouquet[];
      console.log(this.commentbouquet);
    },
    err =>{
      console.log(err);
    }
    );
    });

    }

    delete(commentId: any) {
      var result = confirm("Are you sure?");
      if (result) {
        this.commentService.delete(commentId).then((res) => {
          var result2 = res as ResultAPI;
          if (result2.result) {
            alert("Success");

            // Load lại dữ liệu sau khi xóa
            this.loadComments();
          }
        });
      }
    }

    loadComments() {
      this.activatedRoute.paramMap.subscribe((p) => {
        var bouquetId = p.get("bouquetId");
        this.commentService.findByBouquetId(bouquetId).then(
          (result) => {
            this.commentbouquet = result as CommentBouquet[];
            console.log(this.commentbouquet);
            // Reload trang sau khi cập nhật dữ liệu
            location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
      });
    }
}
