import { Component, OnInit } from '@angular/core';
import {News} from "../modules/news";
import {NewsService} from "../services/news.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  allNews:News[]=[];
  constructor(private newsService:NewsService,private router:ActivatedRoute,) {
    this.router.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.mode = paramMap.get('mode');    // get param from dictonary
      this.ngOnInit();                    // load your data
    });
  }
  mode:string="";
  idUser:string="";
  role:string="";

  ngOnInit(): void {
    this.idUser=localStorage.getItem("id")!;
    this.role=localStorage.getItem("role")!;

    this.mode=this.router.snapshot.params['mode'];
    if(this.mode==="all"){
      this.newsService.getAllNews(Number(this.idUser),this.role).subscribe(value => {
        this.allNews=value;
      })
    }
    else if(this.mode==="worker"){
      let id=localStorage.getItem("id");
      this.newsService.getAllNewsCreatedByWorker(id!).subscribe(value => {
        this.allNews=value;
      })
    }else{
      this.newsService.getAllNewsForMC(Number(this.mode)).subscribe(value => {
        this.allNews=value;
      })
    }
  }

  checkId(creatorId:number):boolean{
    return this.idUser==creatorId.toString();
  }

}
