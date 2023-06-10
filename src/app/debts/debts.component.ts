import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../services/services.service";
import {ActivatedRoute} from "@angular/router";
import {ServiceModel} from "../modules/service-model";
import {ProviderCompanyService} from "../services/provider-company.service";
import {ProviderCompany} from "../modules/provider-company";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {FlatUser} from "../modules/flat-user";
import {string} from "@amcharts/amcharts4/core";
import {HouseService} from "../services/house.service";
import {House} from "../modules/house";
import {ServiceDescription} from "../modules/service-description";
import {ManagementCompany} from "../modules/management-company";
import {ManagementCompaniesService} from "../services/management-companies.service";

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit {

  constructor(private service:ServicesService,
              private router:ActivatedRoute,
              private serviceProvider:ProviderCompanyService,
              private serviceHouse:HouseService,
              private managementCompanyService:ManagementCompaniesService) {
    this.router.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.serviceDescriptionId = paramMap.get('id');
      this.ngOnInit();
    });
  }

  generalServiceModel:FlatUser=new FlatUser();
  providersCompany:ProviderCompany[]=[];

  userCertain:FlatUser=new FlatUser();
  flatUsers:FlatUser[]=[];
  months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

  userId:number=0;
  house:House=new House();
  serviceDescriptionId:number=0;
  serviceDescription:ServiceDescription=new ServiceDescription();
  role:string="";
  managementCompany:ManagementCompany=new ManagementCompany();

  ngOnInit(): void {
    this.role=localStorage.getItem("role")!;
    if(this.role=="USER"){
      this.userId=Number(localStorage.getItem("id"));
    }else {
      this.userId=Number(localStorage.getItem("idUserForPerson"));
    }

    this.serviceDescriptionId=Number(this.router.snapshot.params['id']);

    //долги по услуге
    this.service.getDebtsForService(this.serviceDescriptionId,this.userId).subscribe(value => {
      this.flatUsers=value;
      if(this.flatUsers.length!=0){
        this.generalServiceModel=this.flatUsers[0];
      }
    })

    //находим дом
    this.serviceHouse.getHouseForCertainUser(this.userId).subscribe(value => {
      this.house=value;
      //находим УК
      this.managementCompanyService.getMCByHouse(this.house.id).subscribe(result=>{
        this.managementCompany=result;
      })
    })

    //описание услуги
    this.service.getCertainDescriptionService(this.serviceDescriptionId).subscribe(value => {
      this.serviceDescription=value;
    })
  }

  createReceipt(flatUser: FlatUser) {
    this.userCertain=flatUser;
    let arr=[];
    arr.push(this.userCertain.serviceDTOReceipt);
    this.getInfoForGeneralReceipt(arr);
    setTimeout(() => {
      this.createPdf(flatUser);
    }, 500);

  }

  getInfoForGeneralReceipt(value:ServiceModel[]){
    this.serviceProvider.getProviderCompaniesForHouse(this.house.id).subscribe(providers=>{
      this.providersCompany=providers;

      for(let i=0;i<value.length;i++){
        for(let j=0;j<this.providersCompany.length;j++){
          if(value[i].serviceDescription.id==this.providersCompany[j].serviceDescriptionForProvider.id){
            value[i].codeOfProviderCompany=this.providersCompany[j].id;
            value[i].titleOfProviderCompany=this.providersCompany[j].title;
          }
        }
      }
    })
  }

  createPdf(flatUser:FlatUser){
    document.getElementById("tableInPdf")!.setAttribute('style',"display:block")
    html2canvas(document.getElementById("tableInPdf")!).then(canvas => {
      document.getElementById("tableInPdf")!.setAttribute('style',"display:none")
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG',0, 0, width, height);
      pdf.save(flatUser.numberOfFlat+"_"+flatUser.userSystemDTO.surname+"_"+flatUser.userSystemDTO.name+"_"+flatUser.userSystemDTO.patronymic+'.pdf');
    });
  }

  monthShow(month:number):string {
    return this.months[month];
  }
}
