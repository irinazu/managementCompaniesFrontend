import {Component, OnInit} from '@angular/core';
import {NewsService} from "../services/news.service";
import {Tag} from "../modules/tag";
import {News} from "../modules/news";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  ngModel:any;
  tags:Tag[]=[];
  suitableTags:Tag[]=[];
  chosenTags:Tag[]=[];
  newNews:News=new News();
  errorHeader:string="";
  errorContent:string="";

  constructor(private newsService:NewsService,private router:Router) { }

  ngOnInit(): void {
    this.newsService.getAllTags().subscribe(value => {
      this.tags=value;
    })
  }

  //новая статья
  sub() {
    this.errorContent="";
    this.errorHeader="";

    if(this.chosenTags.length!=0){
      this.newNews.tagList=this.chosenTags;
    }

    let header=(<HTMLInputElement>document.getElementById("nameOfNews")).value;
    if(header.length!=0){
      this.newNews.header=header;
      if(this.ngModel!=undefined){
        this.newNews.content=this.ngModel;
        this.newsService.createNewNews(this.newNews,Number(localStorage.getItem("id"))).subscribe(value => {
          this.router.navigate(['privateOffice','menuNews','allNews','all']);

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
    if(inputPart.length!=0){
      //уже существует
      let tagCheck=this.tags.find(x=>x.title==inputPart);
      //уже добавлен
      let tagCheckAdded=this.chosenTags.find(x=>x.title==inputPart);
      if(tagCheckAdded==undefined&&tagCheck==undefined) {
        this.chosenTags.push({id:0,title:inputPart});
        (<HTMLInputElement>document.getElementById("inputTag")).value="";
      }
    }
  }

  //удаляем тэг
  deleteTag(deleteTag:number) {
    this.chosenTags.splice(deleteTag,1);
  }
}
