import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EventSale } from "src/app/models/event.model";
import { ResultAPI } from "src/app/models/resultapi.model";
import { EventService } from "src/app/service/event.service";



@Component({
    selector:'app-root',
    templateUrl:'./event.component.html',

})

//interface laf implements
export class AddEventComponnent implements OnInit{
    AddEventForm: FormGroup;
    EventSale : EventSale[];
    imageUrl : File;
    ErrorDate : string;
    ErrorImage : string;
    url : any = '';
    constructor(
        private formBuilder : FormBuilder,
        private router  : Router,
        private EventService : EventService,
    ){}
    ngOnInit() {
        this.ErrorDate = null;
        this.ErrorImage = null;
        this.AddEventForm = this.formBuilder.group({
            eventName:['',[
                Validators.required,
            ]],
            description:['',[
                Validators.required,
            ]],
            startDate : new Date(),
            endDate :  new Date(),
            isAction : false
        });

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
        var event : EventSale = this.AddEventForm.value as EventSale;
        console.log(event);
        if(this.imageUrl != null && event.startDate <  event.endDate){
            var formData = new FormData();
            formData.append('imageUrl',this.imageUrl);
            formData.append('strEvent',JSON.stringify(event));
            this.EventService.create(formData).then(
                res =>{
                    var resultApi : ResultAPI = res as ResultAPI;
                    if(resultApi.result){
                        this.router.navigate(['/admin/event'])
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
        }else{
            //In lỗi image null
            if(this.imageUrl == null){
                this.ErrorImage = 'Image cannot null';
            }else{
                this.ErrorImage = null;
            }
            //In lỗi ngày bắt đầu lớn hơn ngày kết thúc
            if(event.startDate >=  event.endDate){
                this.ErrorDate = 'The start date must be before the end date';
            }else{
                this.ErrorDate = null;
            }
        }
    }

}
