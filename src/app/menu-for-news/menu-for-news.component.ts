import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-menu-for-news',
  templateUrl: './menu-for-news.component.html',
  styleUrls: ['./menu-for-news.component.css']
})
export class MenuForNewsComponent implements OnInit {

  constructor(private activateRouter:ActivatedRoute) { }
  public count = false;
  idMC:number=0;

  ngOnInit(): void {
    document.getElementById("allNewsMC")!.setAttribute('style',"background-color:rgba(0, 0, 0, 0.73);height:2px;");
    this.idMC=this.activateRouter.snapshot.params["idMC"];
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
