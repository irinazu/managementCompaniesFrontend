import { Component, OnInit } from '@angular/core';
import {News} from "../modules/news";
import {NewsService} from "../services/news.service";
import {ActivatedRoute} from "@angular/router";
import {Tag} from "../modules/tag";

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
      this.mode = paramMap.get('mode');
      this.ngOnInit();
    });
  }
  mode:string="";
  idMC:number=0;
  idUser:string="";
  role:string="";
  suitableTags:Tag[]=[];
  tags:Tag[]=[];

  ngOnInit(): void {
    this.idUser=localStorage.getItem("id")!;
    this.role=localStorage.getItem("role")!;

    this.mode=this.router.snapshot.params['mode'];
    this.idMC=Number(localStorage.getItem('idMCFromLSForNews'))!;


    this.getAllNews();

    //все тэги
    this.newsService.getAllTags().subscribe(value => {
      this.tags=value;
    })
  }

  checkId(creatorId:number):boolean{
    return this.idUser==creatorId.toString();
  }

  changeTag() {
    this.suitableTags=[];
    let inputPart=(<HTMLInputElement>document.getElementById("inputTag")).value;

    if(inputPart.length!=0){
      for(let i=0;i<this.tags.length;i++){
        if(this.tags[i].title.toLocaleLowerCase().startsWith(inputPart.toLocaleLowerCase())){
          this.suitableTags.push(this.tags[i]);
        }
      }
    }
  }

  chooseTag(tag: number) {
    this.suitableTags=[];
    (<HTMLInputElement>document.getElementById("inputTag")).value="";
    if(this.mode==="all"){
      this.newsService.getAllNews(Number(this.idUser),this.role,tag).subscribe(value => {
        this.allNews=value;
      })
    }
    else if(this.mode==="worker"){
      let id=localStorage.getItem("id");
      this.newsService.getAllNewsCreatedByWorker(id!,tag).subscribe(value => {
        this.allNews=value;
      })
    }else{
      this.newsService.getAllNewsForMC(Number(this.mode),tag).subscribe(value => {
        this.allNews=value;
      })
    }
  }

  getAllNews() {
    if(this.mode==="all"){
      this.newsService.getAllNews(Number(this.idUser),this.role,0).subscribe(value => {
        this.allNews=value;
      })
    }
    else if(this.mode==="worker"){
      let id=localStorage.getItem("id");
      this.newsService.getAllNewsCreatedByWorker(id!,0).subscribe(value => {
        this.allNews=value;
      })
    }else{
      this.newsService.getAllNewsForMC(Number(this.idMC),0).subscribe(value => {
        this.allNews=value;
      })
    }
  }

  checkRole() {
    return this.role == "HEAD" || this.role == "ADMIN";

  }
}
