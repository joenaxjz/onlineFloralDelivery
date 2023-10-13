import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Bouquet } from "src/app/models/bouquet.model";
import { Category } from "src/app/models/category.models";
import { Imagebouquet } from "src/app/models/imageboquet.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { BouquetSerice } from "src/app/service/bouquet.service";
import { CategoryService } from "src/app/service/cateogry.service";
import { ImageBouquetService } from "src/app/service/imageBouquet.service";
import { Pipe, PipeTransform } from '@angular/core';

@Component({
    selector:'app-root',
    templateUrl:'./bouquetdetail.component.html',

})

//interface laf implements
export class BouquetDetailComponent implements OnInit{
  editFromBouquet: FormGroup;
  imagebouquet: Imagebouquet[];
  bouquet!: Bouquet;
  category: Category[];
  urls : any[] = [];
  imageUrls : File[];
  addImageBouquetForm: FormGroup;
  OldBouquetId : string;

  constructor(
    private formBuilder: FormBuilder,
    private bouquetService: BouquetSerice,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private imageBouquetService: ImageBouquetService
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

      this.activatedRoute.paramMap.subscribe(p=>{
        var bouquetId = p.get('bouquetId');
        this.OldBouquetId = bouquetId;
        this.bouquetService.findById(bouquetId!).then(
          result => {
            this.bouquet = result as Bouquet;
            console.log(this.bouquet);
            this.editFromBouquet = this.formBuilder.group({
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

      this.addImageBouquetForm = this.formBuilder.group({
        bouquetId: 0,
      });
      // Theo dõi thay đổi của tham số 'bouquetId' từ đường dẫn
      this.activatedRoute.paramMap.subscribe(p => {
      var bouquetId = p.get('bouquetId');
      this.addImageBouquetForm.patchValue({
         bouquetId: bouquetId // Đổ giá trị bouquetId vào form
        });
      });

}
    save(){
      console.log('Information bouquet');
      var bouquet: Bouquet = this.editFromBouquet.value as Bouquet;
      bouquet.bouquetId = this.bouquet.bouquetId;
      console.log(bouquet);
      this.bouquetService.update(bouquet).then(
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
      mulSelect(event : any){
        var files = event.target.files;
        this.imageUrls =files;
        if(files){
          for(var i=0; i<this.imageUrls.length; i++){
             var reader = new FileReader();
             reader.readAsDataURL(this.imageUrls[i]);
             reader.onload = (events:any)=>{
              this.urls.push(events.target.result);
             }
          }
        }

      }
      saveAddImg() {

        var image : Imagebouquet = this.addImageBouquetForm.value as Imagebouquet;
        if(this.imageUrls != null){
          for(var i=0; i<this.imageUrls.length; i++){
            var formData = new FormData();
            formData.append('imageUrl',this.imageUrls[i]);
            formData.append('strImg',JSON.stringify(image));
            this.imageBouquetService.created(formData).then(
              res =>{
                var resultApi : ResultAPI = res as ResultAPI;
                if(resultApi.result){
                  console.log(resultApi.result);
                }else{
                  alert('Failed 1')
                }
              },
              err =>{
                console.log(err);
                alert('Failed 2')
              }
            );
          }
          this.router.navigate(['admin/bouquet'])
        }
      }
}
