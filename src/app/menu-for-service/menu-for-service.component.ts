import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ServicesService} from "../services/services.service";
import {ServiceDescription} from "../modules/service-description";
import {Subject, Subscription, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-menu-for-service',
  templateUrl: './menu-for-service.component.html',
  styleUrls: ['./menu-for-service.component.css']
})
export class MenuForServiceComponent implements OnInit {

  private destroy$ = new Subject<undefined>();

  constructor(private router: ActivatedRoute,private service:ServicesService) {
    this.router.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = paramMap.get('id');    // get param from dictonary
      this.ngOnInit();                    // load your data
    });
  }

  public count = false;
  id:number=0;
  serviceDescription:ServiceDescription=new ServiceDescription();

  ngOnInit(): void {

    console.log(this.id+ "IN MENU FOR SERVICE");


    document.getElementById("statisticsInfo")!.setAttribute('style',"background-color:rgba(0, 0, 0, 0.73);height:2px;");

    this.id=this.router.snapshot.params['id'];

    this.service.getCertainDescriptionService(this.id).subscribe(value => {
      this.serviceDescription=value;
      this.count=value.counter;
    })
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
