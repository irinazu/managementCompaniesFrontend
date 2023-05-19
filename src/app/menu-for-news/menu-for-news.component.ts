import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-for-news',
  templateUrl: './menu-for-news.component.html',
  styleUrls: ['./menu-for-news.component.css']
})
export class MenuForNewsComponent implements OnInit {

  constructor() { }
  public count = false;

  ngOnInit(): void {
    document.getElementById("allNewsMC")!.setAttribute('style',"background-color:rgba(0, 0, 0, 0.73);height:2px;");

  }

  public onChange(counterExist: boolean): void {
    this.count=counterExist;
  }
  transparentBorder(info:string) {
    for(let i of document.getElementsByClassName("borderLine")){
      i.setAttribute('style','background-color:')
    }
    document.getElementById(info)!.setAttribute('style',"background-color:rgba(0, 0, 0, 0.73)");
  }

}
