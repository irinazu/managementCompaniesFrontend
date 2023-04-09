import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServicesService} from "../services/services.service";
import {ServiceDescription} from "../modules/service-description";

@Component({
  selector: 'app-menu-for-service',
  templateUrl: './menu-for-service.component.html',
  styleUrls: ['./menu-for-service.component.css']
})
export class MenuForServiceComponent implements OnInit {
  public count = false;

  public onChange(counterExist: boolean): void {
    this.count=counterExist;
  }
  constructor(private router: ActivatedRoute,private service:ServicesService) { }

  id:number=0;

  serviceDescription:ServiceDescription=new ServiceDescription();
  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];


    this.service.getCertainDescriptionService(this.id).subscribe(value => {
      this.serviceDescription=value;
      this.count=value.counter;
      console.log(value)
    })
  }

  transparentBorder(info:string) {
    for(let i of document.getElementsByClassName("borderLine")){
      i.setAttribute('style','background-color:')
    }
    // @ts-ignore
    document.getElementById(info).setAttribute('style',"background-colour:rgba(0, 0, 0, 0.73)");
  }
}
