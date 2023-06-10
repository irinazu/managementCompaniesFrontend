import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ServicesService} from "../services/services.service";
import {ServiceDescription} from "../modules/service-description";

@Component({
  selector: 'app-menu-for-request',
  templateUrl: './menu-for-request.component.html',
  styleUrls: ['./menu-for-request.component.css']
})
export class MenuForRequestComponent implements OnInit {

  constructor(private router: ActivatedRoute) {
  }

  public count = false;
  id:number=0;
  serviceDescription:ServiceDescription=new ServiceDescription();
  modeRequest:string="";
  idUserPersonal:number=0;

  ngOnInit(): void {
    this.modeRequest=this.router.snapshot.params['modeRequest'];
    this.idUserPersonal=this.router.snapshot.params['idUserPersonal'];
    console.log(this.router.snapshot.params['idMC']+"!!!!!!!!!!!!!!!!!");


    document.getElementById("openRequest")!.setAttribute('style',"background-color:rgba(0, 0, 0, 0.73);height:2px;");
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

