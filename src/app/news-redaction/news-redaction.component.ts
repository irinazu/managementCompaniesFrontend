import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../services/news.service";
import {News} from "../modules/news";
import {Tag} from "../modules/tag";

@Component({
  selector: 'app-news-redaction',
  templateUrl: './news-redaction.component.html',
  styleUrls: ['./news-redaction.component.css']
})
export class NewsRedactionComponent implements OnInit {
  ngModel:any;
  tags:Tag[]=[];
  suitableTags:Tag[]=[];
  chosenTags:Tag[]=[];
  news:News=new News();
  errorHeader:string="";
  errorContent:string="";
  id:number=-1;
  role: string="";
  idMC: number=0;

  constructor(private newsService:NewsService,private router: ActivatedRoute,private route: Router) { }

  ngOnInit(): void {
    this.idMC=Number(this.router.snapshot.params['idMC']);
    this.role=localStorage.getItem("role")!;

    //получаем все тэги
    this.newsService.getAllTags().subscribe(value => {
      this.tags=value;
    })

    //получаем конкретную новость для редактуры
    this.id=this.router.snapshot.params['id'];
    this.newsService.getCertainNews(this.id).subscribe(value => {
      this.news=value
      this.chosenTags=this.news.tagList;
    })
  }

  //новая статья
  sub() {
    this.errorContent="";
    this.errorHeader="";

    if(this.chosenTags.length!=0){
      this.news.tagList=this.chosenTags;
    }

    if(this.news.header.length!=0){
      if(this.news.content.length!=0){
        this.newsService.updateNews(this.news).subscribe(value => {
          if(this.role=="DISPATCHER"){
            this.route.navigate(['privateOffice','menuNews','allNews','all']);
          }else {
            this.route.navigate(['privateOffice','managementCompaniesForHead','menuNews','allNews','allMC',this.idMC]);
          }
        });
      }else {
        this.errorContent="Статья не должна быть пустой";
      }
    }else {
      this.errorHeader="Заголовок не должен быть пустым";
    }

  }

  //происходит поиск тега из существующих
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

  //добавляем тэг из представленных
  chooseTag(suitableTag: Tag) {
    if(!this.chosenTags.includes(suitableTag)){
      this.chosenTags.push(suitableTag);
      (<HTMLInputElement>document.getElementById("inputTag")).value="";

    }
  }

  //добавляем новый тэг
  createNewTag() {
    let inputPart=(<HTMLInputElement>document.getElementById("inputTag")).value;
    //уже существует
    let tagCheck=this.tags.find(x=>x.title==inputPart);
    //уже добавлен
    let tagCheckAdded=this.chosenTags.find(x=>x.title==inputPart);
    if(tagCheckAdded==undefined&&tagCheck==undefined) {
      this.chosenTags.push({id:0,title:inputPart});
      (<HTMLInputElement>document.getElementById("inputTag")).value="";

    }
  }

  //удаляем тэг
  deleteTag(deleteTag:number) {
    this.chosenTags.splice(deleteTag,1);
  }
}
