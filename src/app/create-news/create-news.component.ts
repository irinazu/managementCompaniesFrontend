import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  ngModel:any;
  tags:string[]=["вода","газ","услуги","оплата","тариф","УК Рассвет","счетчик","отопление","госконтракт","ремонт",
    "суд","голосование","госконтроль","отключение"];
  constructor() { }

  ngOnInit(): void {
  }

  sub() {
    console.log(this.ngModel);
  }

  changeTag() {
    console.log("Hey yoyi")
  }
}
