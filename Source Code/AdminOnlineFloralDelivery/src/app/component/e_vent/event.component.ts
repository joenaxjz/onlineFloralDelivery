
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { EventSale } from "src/app/models/event.model";
import { EventService } from "src/app/service/event.service";



@Component({
    selector:'app-root',
    templateUrl:'./event.component.html',

})

//interface laf implements
export class EventComponnent implements OnInit{

  EventList : EventSale[];
    page : number;
    constructor(
        private EventService: EventService,
        private router : Router,
    ){}

    ngOnInit() {
      this.page = 1;
      console.log(this.page);
      this.EventService.findAll().then(
          result => {
            this.EventList = result as EventSale[];
            console.log(this.EventList);
          },
          error =>{
            console.log(error);
          }
        )

    }
    previousPage(){
      if(this.page >1){
        this.page = this.page -1;
      }
    }
    nextPage(){
        if(this.page<this.EventList.length/5){
            this.page = this.page +1;
        }
    }
    findName(evt : any){
      var keyword = evt.target.value.toUpperCase();
      if(keyword == ''){
        this.EventService.findAll().then(
          result => {
            this.EventList = result as EventSale[];
            console.log(this.EventList);

          },
          error =>{
            console.log(error);
          }
        )
      }else{
        this.EventService.findName(keyword).then(
          res =>{
              this.EventList = res as EventSale[];
              console.log(this.EventList);
          },
          err =>{
              console.log(err);
          }
      )
      }
    }
    findStatus(status : any){
        if(status == 'all'){
            this.EventService.findAll().then(
                result => {
                  this.EventList = result as EventSale[];
                  console.log(this.EventList);

                },
                error =>{
                  console.log(error);
                }
              )
        }else{
            this.EventService.findStatus(status).then(
                res =>{
                    this.EventList = res as EventSale[];
                    console.log(this.EventList);
                },
                err =>{
                    console.log(err);
                }
            )
        }
    }
}
