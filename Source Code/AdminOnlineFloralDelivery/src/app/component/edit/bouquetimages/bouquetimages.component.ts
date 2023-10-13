
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Imagebouquet } from "src/app/models/imageboquet.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { ImageBouquetService } from "src/app/service/imageBouquet.service";

@Component({
    selector:'app-root',
    templateUrl:'./bouquetimages.component.html',

})

//interface laf implements
export class BouquetImagesComponent implements OnInit{
  editFromImage!: FormGroup;
  Imagebouquet : Imagebouquet[];
  OldBouquetId : string;
  imageUrl : File;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private imageService : ImageBouquetService,
    private activatedRoute: ActivatedRoute
    ) { }
    ngOnInit() {

      this.activatedRoute.paramMap.subscribe(p=>{
        var bouquetId = p.get('bouquetId');
        this.OldBouquetId = bouquetId;
      });
      console.log(this.OldBouquetId)
      console.log('abc');
      this.imageService.findbyid(this.OldBouquetId).then(
        result => {
          this.Imagebouquet = result as Imagebouquet[];
        },
        error =>{
          console.log(error);
        }
      )

    }
    selectPhoto(evt : any){
      this.imageUrl = evt.target.files[0];
    }
    update(evt : any){
      if(this.imageUrl != null){
        alert('Are you sure you want to update this')
        this.editFromImage = this.formBuilder.group({
          imageId: evt,
          bouquetId: Number(this.OldBouquetId),
        })
        var image : Imagebouquet = this.editFromImage.value as Imagebouquet;
        var formData = new FormData();
        formData.append('imageUrl',this.imageUrl);
        formData.append('strImg',JSON.stringify(image));
        this.imageService.update(formData).then(
          res =>{

              var resultApi : ResultAPI = res as ResultAPI;
              if(resultApi.result){
                alert('Success')
                this.imageService.findAll().then(
                  result => {
                    this.Imagebouquet = result as Imagebouquet[];
                    console.log(this.Imagebouquet);
                  },
                  error =>{
                    console.log(error);
                  }
                )
              }else{
                  alert('Failed 1')
              }
          },
          err =>{
              console.log(err);
              alert('Failed 2')
          }
      );
      }else{
        alert('Please choose new images')
      }

    }
    delete(id : any){
      alert('Are you sure you want to delete this')
      this.imageService.delete(id).then(
        res =>{

              alert('Success')
              this.imageService.findbyid(this.OldBouquetId).then(
                result => {
                  this.Imagebouquet = result as Imagebouquet[];
                  console.log(this.Imagebouquet);
                },
                error =>{
                  console.log(error);
                }
              )

        },
        err =>{
            console.log(err);
            alert('Failed 2')
        }
    );

    }

}
