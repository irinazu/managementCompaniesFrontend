import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../services/news.service";
import {News} from "../modules/news";

@Component({
  selector: 'app-certain-news',
  templateUrl: './certain-news.component.html',
  styleUrls: ['./certain-news.component.css']
})
export class CertainNewsComponent implements OnInit {

  constructor(private router: ActivatedRoute,private newsService:NewsService) { }
  id:number=0;
  news:News=new News();
  idUser:string="";

  ngOnInit(): void {
    this.idUser=localStorage.getItem("id")!;

    this.id=this.router.snapshot.params['id'];
    this.newsService.getCertainNews(this.id).subscribe(value => {
      this.news=value
    })
  }

  checkId():boolean{
    return this.idUser==this.news.creator.id.toString();
  }

}
