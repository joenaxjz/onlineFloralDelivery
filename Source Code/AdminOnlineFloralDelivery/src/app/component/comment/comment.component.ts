import { Component, OnInit ,} from "@angular/core";
import { CommentBouquet } from "src/app/models/comment.model";
import { CommentService } from "src/app/service/comment.service";

@Component({
    selector:'app-root',
    templateUrl:'./comment.component.html',

})

//interface laf implements
export class CommentComponent implements OnInit{

  commentbouquet: CommentBouquet[]

  constructor(
    private commentServie: CommentService,

  ){}
    ngOnInit() {
      this.commentServie.findAll().then(
        result => {
          this.commentbouquet = result as CommentBouquet[];
          console.log(this.commentbouquet);
        },
        error =>{
          console.log(error);
        }
      );


    }
}
