import {Component, Input, OnInit} from '@angular/core';
import {ServicesService} from "../services/services.service";
import {ServiceModel} from "../modules/service-model";
import {ActivatedRoute} from "@angular/router";
import {ServiceDescription} from "../modules/service-description";

@Component({
  selector: 'app-new-data-counter',
  templateUrl: './new-data-counter.component.html',
  styleUrls: ['./new-data-counter.component.css']
})
export class NewDataCounterComponent implements OnInit {

  service:ServiceModel=new ServiceModel();
  newDataForService:ServiceModel=new ServiceModel();
  consumption:number|undefined;

  userId:number=0;
  serviceDescriptionId:number=0;
  noLastData:boolean=false;
  sameDate:boolean=false;
  serviceDescription:ServiceDescription=new ServiceDescription();
  role:string="";

  constructor(private serviceForData:ServicesService,private router:ActivatedRoute) {
    this.router.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.serviceDescriptionId = paramMap.get('id');
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.role=localStorage.getItem("role")!;
    if(this.role=="USER"){
      this.userId=Number(localStorage.getItem("id"));
    }else {
      this.userId=Number(localStorage.getItem("idUserForPerson"));
    }
    this.serviceDescriptionId=Number(this.router.snapshot.params['id']);

    //находим описание услуги
    this.serviceForData.getCertainDescriptionService(this.serviceDescriptionId).subscribe(value => {
      this.serviceDescription=value;
    })

    this.serviceForData.getLastDataForCounter(this.serviceDescriptionId,this.userId).subscribe(value => {
      if(value!=null){
        this.service=value;

        this.checkDate();
      }
    })
  }
  submitData(){
    this.newDataForService.consumption=this.consumption;
    this.newDataForService.serviceDescription.id=this.serviceDescriptionId;
    this.newDataForService.year=new Date().getFullYear();
    this.serviceForData.createNewDataForCounter(this.newDataForService,this.userId).subscribe(value => {
      this.service=value;
      this.checkDate();
    });
    this.consumption=undefined;

  }

  //если показания этого месяца, то ничего не отправляем
  checkDate(){
    if(this.service.year==new Date().getFullYear()&&this.service.monthNumber==new Date().getMonth()){
      (<HTMLInputElement>document.getElementById("submitButton"))!.disabled = true;
      this.sameDate=true;
    }
  }
}
