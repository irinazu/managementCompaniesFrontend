import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../services/services.service";
import {ServiceModel} from "../modules/service-model";
import {ActivatedRoute} from "@angular/router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {ProviderCompany} from "../modules/provider-company";
import {ProviderCompanyService} from "../services/provider-company.service";
import {FlatUser} from "../modules/flat-user";
import {string} from "@amcharts/amcharts4/core";
import {House} from "../modules/house";
import {HouseService} from "../services/house.service";
import {ServiceDescription} from "../modules/service-description";
import {ManagementCompany} from "../modules/management-company";
import {ManagementCompaniesService} from "../services/management-companies.service";

@Component({
  selector: 'app-history-of-service',
  templateUrl: './history-of-service.component.html',
  styleUrls: ['./history-of-service.component.css']
})
export class HistoryOfServiceComponent implements OnInit {

  months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  years:number[]=[];

  providersCompany:ProviderCompany[]=[];

  userId:number=0;
  flatUsers:FlatUser[]=[];
  userCertain:FlatUser=new FlatUser();

  year:number=0;
  month:number=0;
  house:House=new House();
  serviceDescriptionId:number=0;
  serviceDescription:ServiceDescription=new ServiceDescription();
  role:string="";
  managementCompany:ManagementCompany=new ManagementCompany();

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

  ngOnInit(): void {
    this.role=localStorage.getItem("role")!;
    if(this.role=="USER"){
      this.userId=Number(localStorage.getItem("id"));
    }else {
      this.userId=Number(localStorage.getItem("idUserForPerson"));
    }
    this.serviceDescriptionId=Number(this.router.snapshot.params['id']);

    //находим дом
    this.serviceHouse.getHouseForCertainUser(this.userId).subscribe(value => {
      this.house=value;
      //находим УК
      this.managementCompanyService.getMCByHouse(this.house.id).subscribe(result=>{
        this.managementCompany=result;
      })
    })

    //находим описание услуги
    this.service.getCertainDescriptionService(this.serviceDescriptionId).subscribe(value => {
      this.serviceDescription=value;
    })

    //находим все квитанции по данной услуге
   this.service.getDataForService(this.serviceDescriptionId,this.userId).subscribe(value => {
     this.flatUsers=value;
     this.getYears();
   })
  }

  getValue() {
    let valueYear = (<HTMLInputElement>document.getElementById("selectYear")).value;
    let valueMonth = (<HTMLInputElement>document.getElementById("selectMonth")).value;

    if(Number(valueYear)==0&&Number(valueMonth)==-1){

      (<HTMLInputElement>document.getElementById("selectYear")).value=String(0);
      (<HTMLInputElement>document.getElementById("selectMonth")).value=String(-1);

      this.service.getDataForService(this.serviceDescriptionId,this.userId).subscribe(value => {

        this.flatUsers=value;
      })
    }else if(Number(valueYear)!=0&&Number(valueMonth)!=-1){
      let indexOfMonth=this.months.indexOf(valueMonth);

      this.service.getCertainService(this.serviceDescriptionId,Number(valueYear),indexOfMonth,this.userId).subscribe(value => {
        if(value!=null){
          this.flatUsers=[value];
        }else {
          this.flatUsers=[];
        }
      })
    }else if(Number(valueYear)!=0&&Number(valueMonth)==-1){
      this.service.getServicesByYear(this.serviceDescriptionId,Number(valueYear),this.userId).subscribe(value => {
        this.flatUsers=value;
      })
    }else if(Number(valueYear)==0&&Number(valueMonth)!=-1){
      let indexOfMonth=this.months.indexOf(valueMonth);

      this.service.getServicesByMonth(this.serviceDescriptionId,indexOfMonth,this.userId).subscribe(value => {
        this.flatUsers=value;
      })
    }
  }

  /*//сортировка по дате
  sortOnDateServices(){
    this.services.sort( function( a , b){
      if(new Date(a.dateOfConsumption).getTime() < new Date(b.dateOfConsumption).getTime()) return 1;
      if(new Date(a.dateOfConsumption).getTime() > new Date(b.dateOfConsumption).getTime()) return -1;
      return 0;
    });
  }*/

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


  //собираем года
  getYears(){
    this.service.getYears().subscribe(value => {
      this.years=value;
    })
  }

  monthShow(monthNumber:number):string {
    return this.months[monthNumber];
  }
}
