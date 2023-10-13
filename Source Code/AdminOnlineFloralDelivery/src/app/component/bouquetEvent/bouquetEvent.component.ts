import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Bouquet } from "src/app/models/bouquet.model";
import { BouquetEvent } from "src/app/models/bouquetevent.model";
import { Category } from "src/app/models/category.models";
import { EventSale } from "src/app/models/event.model";
import { Imagebouquet } from "src/app/models/imageboquet.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { BouquetSerice } from "src/app/service/bouquet.service";
import { BouquetEventSerice } from "src/app/service/bouquetevent.service";
import { CategoryService } from "src/app/service/cateogry.service";
import { EventService } from "src/app/service/event.service";
import { ImageBouquetService } from "src/app/service/imageBouquet.service";

@Component({
    selector:'app-root',
    templateUrl:'./bouquetEvent.component.html',

})

//interface laf implements
export class BouquetEventComponent implements OnInit{

  eventSale: EventSale;
  bouquetList: Bouquet[];
  category: Category[];
  bouquet: Bouquet[];
  bouquetedit!: Bouquet;
  bouquetevent: BouquetEvent[];
  selectBouquetId: any;
  formGroupBouquet: FormGroup;
  formGroupEditPrice!:FormGroup;
  bouquetIdControl: FormControl;
  bouquetNameControl: FormControl;
  bouquetCategoryControl: FormControl;
  bouquetPriceControl: FormControl;
  bouquetEventPriceControl: FormControl;
  bouquetOrginalPriceControl: FormControl;
  bouquetCategoryIdControl:FormControl;
  bouquetStatusControl:FormControl;
  bouquetDescriptionControl:FormControl;
  bouquetCreatedControl:FormControl;
  eventIdControl: FormControl;
  eventNameControl: FormControl;
  constructor(
    private formBuilder: FormBuilder,
    private bouquetService: BouquetSerice,
    private eventService: EventService,
    private categoryService: CategoryService,
    private bouqueteventSerive: BouquetEventSerice,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
    ngOnInit() {

      // hien thi danh sach category
      this.categoryService.findAll().then(
        result => {
          this.category = result as Category[];
        },
        err => {
          console.log(err);
        }
      )

      // hien thi thong tin chi tiet cua su kien do
      this.activatedRoute.paramMap.subscribe(p =>{
        var id = p.get('id');
        this.eventService.findId(id).then(
            res => {
                this.eventSale = res as EventSale;
                console.log(res);

                this.formBuilder.group({
                    eventId : this.eventSale.eventId,
                    eventName : this.eventSale.eventName,
                    imageUrl : this.eventSale.imageUrl,
                    startDate : this.eventSale.startDate,
                    endDate :  this.eventSale.endDate,
                    isAction : this.eventSale.isAction
                });
            },
            err => {
                console.log(err);
            }
        )
    });

    // hien thi danh sach bouquet event dua vao eventid
    this.activatedRoute.paramMap.subscribe(p =>{
      var id = p.get('id');
      this.bouqueteventSerive.findByEventId(id).then(
        res =>{
          this.bouquetevent = res as BouquetEvent[];

        },err =>{
          console.log(err)
        }
      )
    });


     // Khởi tạo FormGroup và các FormControl
     this.bouquetIdControl = new FormControl('');
     this.bouquetNameControl = new FormControl('');
     this.bouquetCategoryControl = new FormControl('');
     this.bouquetPriceControl = new FormControl('');
     this.bouquetEventPriceControl = new FormControl('');
     this.bouquetOrginalPriceControl = new FormControl('');
     this.bouquetCategoryIdControl = new FormControl('');
     this.bouquetStatusControl = new FormControl('');
     this.bouquetDescriptionControl = new FormControl('');
     this.bouquetCreatedControl = new FormControl('');
     this.eventIdControl = new FormControl('');
     this.eventNameControl = new FormControl('');
     // Khởi tạo FormGroup và liên kết các FormControl
     this.formGroupBouquet = this.formBuilder.group({
       bouquetId: this.bouquetIdControl,
       bouquetName: this.bouquetNameControl,
       eventId: this.eventIdControl,
       eventName: this.eventNameControl
     });

     this.formGroupEditPrice = this.formBuilder.group({
      bouquetId: this.bouquetIdControl,
      bouquetName: this.bouquetNameControl,
      price: this.bouquetPriceControl,
      eventPrice: this.bouquetEventPriceControl,
      secondPrice: this.bouquetOrginalPriceControl,
      categoryName: this.bouquetCategoryControl,
      status:this.bouquetStatusControl,
      description :  this.bouquetDescriptionControl,
      created: this.bouquetCreatedControl,
      categoryId: this.bouquetCategoryIdControl
     });

      // Theo dõi thay đổi của tham số 'bouquetId' từ đường dẫn
      this.activatedRoute.paramMap.subscribe(p => {
        var eventId = p.get('eventId');
        this.formGroupBouquet.patchValue({
          eventId: eventId // Đổ giá trị bouquetId vào form
          });
        });
    }

    findByBouquetName(evt: any){
      var keyword = evt.target.value.toUpperCase();
      if (keyword == ""){

      }else{
        this.bouquetService.findByBouquetName(keyword).then(
          res =>{
            this.bouquetList = res as Bouquet[];

          },err =>{
            console.log(err)
          }
        )
      }
    }
    selectBouquetByCategory(evt: any){
      var categoryId = evt.target.value;
      this.bouquetService.findByCategoryId(categoryId).then(
        res =>{
        this.bouquetList = res as Bouquet[];

       },
       err =>{
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
    onAddButtonClick(bqList: any) {
      this.bouquetIdControl.setValue(bqList.bouquetId);
      this.bouquetNameControl.setValue(bqList.bouquetName);
      this.bouquetCategoryControl.setValue(bqList.categoryName);
      this.bouquetPriceControl.setValue(bqList.price);
      this.bouquetEventPriceControl.setValue(bqList.eventPrice);
      this.bouquetOrginalPriceControl.setValue(bqList.price);
      this.bouquetCategoryIdControl.setValue(bqList.categoryId);
      this.bouquetStatusControl.setValue(bqList.status);
      this.bouquetDescriptionControl.setValue(bqList.description);
      this.bouquetCreatedControl.setValue(bqList.created);
      this.eventIdControl.setValue(this.eventSale.eventId);
      this.eventNameControl.setValue(this.eventSale.eventName)
  }

  // update lại gia truoc khi them vao sự kiện
  addBouquetEvent(){
    var bouquetevent: BouquetEvent = this.formGroupBouquet.value as BouquetEvent;
    console.log(bouquetevent);
    this.bouqueteventSerive.created(bouquetevent).then(
      result => {
        console.log(result);
        var resultAPI: ResultAPI = result as ResultAPI;
        alert('Success');
        this.activatedRoute.paramMap.subscribe(p =>{
          var id = p.get('id');
          this.bouqueteventSerive.findByEventId(id).then(
            res =>{
              this.bouquetevent = res as BouquetEvent[];

            },err =>{
              console.log(err)
            }
          )
      });
      },err =>{
        console.log(err);
        alert('Fail! The bouquet already exists at another event!');
      }
    )
  }

  editPriceBouquetEvent(){
    console.log('Information bouquet');
    var bouquetedit: Bouquet = this.formGroupEditPrice.value as Bouquet;
    bouquetedit.bouquetId = this.bouquetIdControl.value;
    console.log(bouquetedit);
    this.bouquetService.update(bouquetedit).then(
      resutl =>{
        var resultAPI: ResultAPI = resutl as ResultAPI;
        if(resultAPI.result){
          alert('Update Price Success');
          this.activatedRoute.paramMap.subscribe(p =>{
            var id = p.get('id');
            this.bouqueteventSerive.findByEventId(id).then(
              res =>{
                this.bouquetevent = res as BouquetEvent[];

              },err =>{
                console.log(err)
              }
            )
        });
        }
      },err => {
        console.log("Error Update price");
      }
   )
  }

  delete(bouquetId: any){
    var result = confirm('Do you want to remove the bouquet from the event?');
    if(result){
      this.bouqueteventSerive.delete(bouquetId).then(
        resutl =>{
          var resultAPI: ResultAPI = resutl as ResultAPI;
          if(resultAPI.result){
            alert('Delete Success');
            this.activatedRoute.paramMap.subscribe(p =>{
              var id = p.get('id');
              this.bouqueteventSerive.findByEventId(id).then(
                res =>{
                  this.bouquetevent = res as BouquetEvent[];

                },err =>{
                  console.log(err)
                }
              )
          });
          }
        },err => {
          console.log("Error!");
        }
      )
    }
  }

  onEditPriceClick(bqevent: any) {
    this.bouquetIdControl.setValue(bqevent.bouquetId);
    this.bouquetNameControl.setValue(bqevent.bouquetName);
    this.bouquetCategoryControl.setValue(bqevent.categoryName);
    this.bouquetPriceControl.setValue(bqevent.price);
    this.bouquetEventPriceControl.setValue(bqevent.eventPrice);
    this.bouquetOrginalPriceControl.setValue(bqevent.price);
    this.bouquetCategoryIdControl.setValue(bqevent.categoryId);
    this.bouquetStatusControl.setValue(bqevent.status);
    this.bouquetDescriptionControl.setValue(bqevent.description);
    this.bouquetCreatedControl.setValue(bqevent.created);
  }
}
