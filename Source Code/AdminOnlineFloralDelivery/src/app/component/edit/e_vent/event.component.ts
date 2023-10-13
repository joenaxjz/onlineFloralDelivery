import { formatDate } from "@angular/common";
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EventSale } from "src/app/models/event.model";
import { ResultAPI } from "src/app/models/resultapi.model";

import { EventService } from "src/app/service/event.service";



@Component({
    selector:'app-root',
    templateUrl:'./event.component.html',
})

//interface laf implements
export class EditEventComponnent implements OnInit{
    EditEventForm: FormGroup;
    EventSale : EventSale[];
    EventDetail : EventSale;
    ErrorDate : string;
    imageUrl : File;
    url : any = null;

    constructor(
        private formBuilder : FormBuilder,
        private router  : Router,
        private EventService : EventService,
        private ActivatedRoute: ActivatedRoute,
    ){}
    ngOnInit() {
        this.ErrorDate = null;
        this.ActivatedRoute.paramMap.subscribe(p =>{
            var id = p.get('id');
            this.EventService.findId(id).then(
                res => {
                    this.EventDetail = res as EventSale;
                    console.log(res);

                    this.EditEventForm = this.formBuilder.group({
                        eventId : this.EventDetail.eventId,
                        eventName : this.EventDetail.eventName,
                        description : this.EventDetail.description,
                        startDate : this.EventDetail.startDate,
                        endDate :  this.EventDetail.endDate,
                        isAction : this.EventDetail.isAction
                    });
                    this.url = this.EventDetail.imageUrl;
                },
                err => {
                    console.log(err);
                }
            )
        });
        this.EditEventForm = this.formBuilder.group({
            eventName:['',[
                Validators.required,
            ]],
            description:['',[
                Validators.required,
            ]],
            startDate : '',
            endDate :  '',
            isAction : '',
        })
    }
    selectPhoto(evt : any){
        this.imageUrl = evt.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.imageUrl);
        reader.onload = (_image) => {
            this.url = reader.result;
        }
    }
    save(){
        var event : EventSale = this.EditEventForm.value as EventSale;
        //Bắt lỗi ngày bắt đầu và ngày kết thúc
        if(event.startDate < event.endDate){
            this.ErrorDate = null;
            var formData = new FormData();
            formData.append('imageUrl',this.imageUrl);
            formData.append('strEvent',JSON.stringify(event));
            this.EventService.update(formData).then(
                res =>{

                    var resultApi : ResultAPI = res as ResultAPI;
                    if(resultApi.result){
                        this.router.navigate(['/admin/event'])
                    }else{
                        alert('Failed 1')
                    }
                },
                err =>{
                    console.log(err);
                    alert('Failed 2')
                }
            );
        }//In lỗi ngày
        else{
            this.ErrorDate = 'The start date must be before the end date';
        }

    }

}
