import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {ServicesService} from "../services/services.service";
import {ServiceModel} from "../modules/service-model";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {string} from "@amcharts/amcharts4/core";
import html2canvas from 'html2canvas';
import {ProviderCompanyService} from "../services/provider-company.service";
import {ProviderCompany} from "../modules/provider-company";
import {FlatUser} from "../modules/flat-user";
import {House} from "../modules/house";
import {HouseService} from "../services/house.service";
import {ManagementCompany} from "../modules/management-company";
import {ManagementCompaniesService} from "../services/management-companies.service";

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit {

  months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  years:number[]=[];

  services:ServiceModel[]=[];
  providersCompany:ProviderCompany[]=[];
  generalResultWithDuty:number=0;
  monthResult:number=0;
  serviceWithCounter:ServiceModel[]=[];
  chart:any;
  title:any;
  generalChart:any;
  generalTitle:any;

  userId:number=0;
  userCertain:FlatUser=new FlatUser();

  year:number=0;
  month:number=0;
  house:House=new House();
  role:string="";
  managementCompany:ManagementCompany=new ManagementCompany();

  constructor(private service:ServicesService,private serviceProvider:ProviderCompanyService,
              private serviceHouse:HouseService,private managementCompanyService:ManagementCompaniesService) { }

  ngOnInit(): void {
    this.role=localStorage.getItem("role")!;
    if(this.role=="USER"){
      this.userId=Number(localStorage.getItem("id"));
    }else {
      this.userId=Number(localStorage.getItem("idUserForPerson"));
    }

    this.year=new Date().getFullYear();
    this.month=new Date().getMonth();

    //находим дом
    this.serviceHouse.getHouseForCertainUser(this.userId).subscribe(value => {
      this.house=value;
      //находим УК
      this.managementCompanyService.getMCByHouse(this.house.id).subscribe(result=>{
        this.managementCompany=result;
      })
    })


    this.createMonthChart("dutyForThisMonth","divPie");
    this.createGeneralChart("generalDutyForService","divPieGeneral");
    this.formChartAndData(this.year,this.month);

    this.getYears();

  }

  createMonthChart(dataMember:string,htmlElement:string) {
    this.chart = am4core.create(htmlElement, am4charts.PieChart);
    this.chart.padding(20,10,20,10);

    let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = dataMember;
    pieSeries.dataFields.category = "title";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    this.chart.legend = new am4charts.Legend();
    this.chart.legend.position = "right";
    this.chart.innerRadius = am4core.percent(60);

    let label = pieSeries.createChild(am4core.Label);
    label.text = "{values.value.sum} руб";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 20;
    this.title = this.chart.titles.create();
    this.title.fontSize=18;

  }

  createGeneralChart(dataMember:string,htmlElement:string) {
    this.generalChart = am4core.create(htmlElement, am4charts.PieChart);
    this.generalChart.padding(20,10,20,10);

    let pieSeries = this.generalChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = dataMember;
    pieSeries.dataFields.category = "title";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    this.generalChart.legend = new am4charts.Legend();
    this.generalChart.legend.position = "right";
    this.generalChart.innerRadius = am4core.percent(60);

    let label = pieSeries.createChild(am4core.Label);
    label.text = "{values.value.sum} руб";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 20;
    this.generalTitle = this.generalChart.titles.create();
    this.generalChart.fontSize=18;
  }

  //Года за которые можно получить данные
  getYears(){
    this.service.getYears().subscribe(value => {
      this.years=value;
      (<HTMLInputElement>document.getElementById("selectYear"))!.value=this.year.toString();
      (<HTMLInputElement>document.getElementById("selectMonth"))!.value=this.months[this.month].toString();

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

    this.formChartAndData(valueYear,indexOfMonth);

  }

  createPdf(){
    document.getElementById("tableInPdf")!.setAttribute('style',"display:block")
    html2canvas(document.getElementById("tableInPdf")!).then(canvas => {
      document.getElementById("tableInPdf")!.setAttribute('style',"display:none")
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG',0, 0, width, height);
      pdf.save(this.userCertain.numberOfFlat+"_"+this.userCertain.userSystemDTO.surname+"_"+this.userCertain.userSystemDTO.name+"_"+this.userCertain.userSystemDTO.patronymic+'.pdf');
    });
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

  //Данные за определенный месяц
  private formChartAndData(year:number,month:number) {
    this.services=[];
    this.providersCompany=[];
    this.generalResultWithDuty=0;
    this.monthResult=0;
    this.serviceWithCounter=[];

    this.service.getAllServicesForDate(year,month,this.userId).subscribe(certainUser => {
      if(certainUser.serviceDTOS.length!=0){
        document.getElementById("divPie")!.style.display="block";
        document.getElementById("divPieGeneral")!.style.display="block";
        document.getElementById("detailsInfo")!.style.display="block";


        this.userCertain=certainUser;

        let value=certainUser.serviceDTOS;
        value.forEach(x=>this.generalResultWithDuty+=x.generalDutyForService);
        value.forEach(x=>this.monthResult+=x.dutyForThisMonth);
        for(let i=0;i<value.length;i++){
          if(value[i].serviceDescription.counter){
            this.serviceWithCounter.push(value[i]);
          }
        }
        this.getInfoForGeneralReceipt(value);
        this.chart.data=value;
        this.generalChart.data=value;
        this.services=value;
        value.forEach(x=>x.title=x.serviceDescription.title);

        //this.title = this.chart.titles.create();
        this.title.text = "Начисление за "+this.months[value[0].monthNumber]+" "+value[0].year;
        this.generalTitle.text = "Начисление за "+this.months[value[0].monthNumber]+" "+value[0].year+" c долгом";

        (<HTMLInputElement>document.getElementById('selectMonth')).value= this.months[value[0].monthNumber];
        (<HTMLInputElement>document.getElementById('selectYear')).value= String(value[0].year);
        this.title.marginBottom=15;
      }else {
        document.getElementById("divPie")!.style.display="none";
        document.getElementById("divPieGeneral")!.style.display="none";
        document.getElementById("detailsInfo")!.style.display="none";

      }
    })
  }

  monthShow():string {
    return this.months[this.month];
  }

}
