import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../services/services.service";
import {FlatUser} from "../modules/flat-user";
import {ActivatedRoute} from "@angular/router";
import {House} from "../modules/house";
import {HouseService} from "../services/house.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {ProviderCompanyService} from "../services/provider-company.service";
import {ProviderCompany} from "../modules/provider-company";
import {ServiceModel} from "../modules/service-model";
import {UserSystem} from "../modules/user-system";
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ManagementCompany} from "../modules/management-company";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private serviceService:ServicesService,
              private routerActive:ActivatedRoute,
              private houseService:HouseService,
              private serviceProvider:ProviderCompanyService,
              private managementCompanyService:ManagementCompaniesService) { }

  houseId:number=0;
  modeReport:string="";
  flatUsers:FlatUser[]=[];
  house:House=new House();
  titlePDF:string="";

  providersCompany:ProviderCompany[]=[];
  services:ServiceModel[]=[];
  generalResultWithDuty:number=0;
  monthResult:number=0;
  serviceWithCounter:ServiceModel[]=[];
  userCertain:FlatUser=new FlatUser();

  title:any;
  generalTitle:any;
  year:number=0;
  month:number=0;

  months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  years:number[]=[];
  managementCompany:ManagementCompany=new ManagementCompany();

  ngOnInit(): void {
    this.houseId=this.routerActive.snapshot.params["houseId"];
    this.modeReport=this.routerActive.snapshot.params["modeReport"];

    this.getYears();

    this.houseService.getHouse(this.houseId).subscribe(value => {
      this.house=value;
      this.titlePDF='г. '+this.house.town+"_"+'ул. '+this.house.street+"_"+this.house.numberOfHouse+'.pdf';

      //находим УК
      this.managementCompanyService.getMCByHouse(this.house.id).subscribe(result=>{
        this.managementCompany=result;
      })
    })

    //долги
    if(this.modeReport=="debts"){
      this.titlePDF='Отчет по должникам'+this.titlePDF;

      this.serviceService.getGeneralDutyWithDetails(this.houseId).subscribe(value => {
        this.flatUsers=value;
      })
    }else if(this.modeReport=="receipt"){
      document.getElementById("report")!.style.width="60%";
      document.getElementById("report")!.style.top="200px";

      //поставщики услуг
      this.serviceProvider.getProviderCompaniesForHouse(this.houseId).subscribe(value => {
        this.providersCompany=value;
      });
      this.year=new Date().getFullYear();
      this.month=new Date().getMonth();

      //собрали квитанции
      this.serviceService.getAllUsersWithServicesForDate(this.houseId,this.year,this.month).subscribe(value => {
        this.flatUsers=value;
      })

    }
    else{
      document.getElementById("report")!.style.width="75%";
      if(this.modeReport=="check"){
        this.titlePDF='Отчет по датам проверок счетчиков'+this.titlePDF;
      }else {
        this.titlePDF='Отчет по датам замены счетчиков'+this.titlePDF;
      }

      //счетчики
      this.serviceService.getMeteringDevices(this.houseId).subscribe(value => {
        this.flatUsers=value;
      })
    }
  }

  //общий долг
  countGeneralDebtForFlat(flatUser: FlatUser):number {
    let general=0;
    for (let fu of flatUser.serviceDTOS){
      general+=fu.generalDutyForService;
    }
    return general;
  }

  createPdf(){
    html2canvas(document.getElementById(this.modeReport)!).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = 150;
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG',30, 0, width, height);
      pdf.save(this.titlePDF);
    });
  }

  createPdfReceipt(user:FlatUser){
    document.getElementById("tableInPdf")!.setAttribute('style',"display:block")
    html2canvas(document.getElementById("tableInPdf")!).then(canvas => {
      document.getElementById("tableInPdf")!.setAttribute('style',"display:none")
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG',0, 0, width, height);
      pdf.save(user.numberOfFlat+"_"+user.userSystemDTO.surname+"_"+user.userSystemDTO.name+"_"+user.userSystemDTO.patronymic+'.pdf');
    });
  }

  //Данные за определенный месяц
  formPDF(userCertain:FlatUser) {
    this.userCertain=userCertain;
    let value=userCertain.serviceDTOS;
    this.services=[];
    this.generalResultWithDuty=0;
    this.monthResult=0;
    this.serviceWithCounter=[];

    value.forEach(x=>this.generalResultWithDuty+=x.generalDutyForService);
    value.forEach(x=>this.monthResult+=x.dutyForThisMonth);
    for(let i=0;i<value.length;i++){
      if(value[i].serviceDescription.counter){
        this.serviceWithCounter.push(value[i]);
      }
    }
    this.getInfoForGeneralReceipt(value);
    this.services=value;
    value.forEach(x=>x.title=x.serviceDescription.title);

    // @ts-ignore
    document.getElementById('selectMonth').value= this.months[value[0].monthNumber];
    // @ts-ignore
    document.getElementById('selectYear').value= value[0].year;

    setTimeout(() => {
      this.createPdfReceipt(userCertain);
    }, 500);

  }

  //кода для поставщиков
  getInfoForGeneralReceipt(value:ServiceModel[]){
    for(let i=0;i<value.length;i++){
      for(let j=0;j<this.providersCompany.length;j++){
        if(value[i].serviceDescription.id==this.providersCompany[j].serviceDescriptionForProvider.id){
          value[i].codeOfProviderCompany=this.providersCompany[j].id;
          value[i].titleOfProviderCompany=this.providersCompany[j].title;
        }
      }
    }
  }

  //Года за которые можно получить данные
  getYears(){
    this.serviceService.getYears().subscribe(value => {
      this.years=value;
    })
  }

  getValue() {
    // @ts-ignore
    let valueYear = document.getElementById("selectYear").value;
    // @ts-ignore
    let valueMonth = document.getElementById("selectMonth").value;
    let indexOfMonth=this.months.indexOf(valueMonth);

    this.year=valueYear;
    this.month=indexOfMonth;

    //собрали квитанции
    this.serviceService.getAllUsersWithServicesForDate(this.houseId,this.year,this.month).subscribe(value => {
      this.flatUsers=value;
    })
  }

  monthShow():string {
    return this.months[this.month];
  }
}
