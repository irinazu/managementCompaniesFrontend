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

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit {

  months=[
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Ноябрь',
    'Декабрь',
  ];
  years:number[]=[];

  services:ServiceModel[]=[];
  providersCompany:ProviderCompany[]=[];
  generalResultWithDuty:number=0;
  monthResult:number=0;
  serviceWithCounter:ServiceModel[]=[];

  constructor(private service:ServicesService,private serviceProvider:ProviderCompanyService) { }

  ngOnInit(): void {

    var chart = am4core.create("divPie", am4charts.PieChart);
    chart.padding(20,10,20,10);
    //chart.radius = am4core.percent(70);

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "dutyForThisMonth";
    pieSeries.dataFields.category = "title";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.innerRadius = am4core.percent(60);

    var label = pieSeries.createChild(am4core.Label);
    label.text = "{values.value.sum} руб";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 25;

    //Данные за определенный месяц
    this.service.getAllServicesForDate(new Date().getFullYear(),new Date().getMonth()).subscribe(value => {

      value.forEach(x=>this.generalResultWithDuty+=x.generalDutyForService);
      value.forEach(x=>this.monthResult+=x.dutyForThisMonth);
      for(let i=0;i<value.length;i++){
        if(value[i].serviceDescription.counter){
          this.serviceWithCounter.push(value[i]);
        }
      }
      this.getInfoForGeneralReceipt(value);

      chart.data=value;
      this.services=value;
      value.forEach(x=>x.title=x.serviceDescription.title);

      var title = chart.titles.create();
      title.text = "Подсчет за "+this.months[value[0].monthNumber]+" "+value[0].year;
      // @ts-ignore
      document.getElementById('selectMonth').value= this.months[value[0].monthNumber];
      // @ts-ignore
      document.getElementById('selectYear').value= value[0].year;
      title.marginBottom=15;
    })

    //Года за которые можно получить данные
    this.service.getYears().subscribe(value => {
      this.years=value;
    })


  }

  getValue() {
    var selectYear = document.getElementById("selectYear");
    var selectMonth = document.getElementById("selectMonth");

    // @ts-ignore
    var valueYear = selectYear.value;
    // @ts-ignore
    var valueMonth = selectMonth.value;
    console.log(valueYear);
    console.log(valueMonth);

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
      pdf.save('output.pdf');
    });
  }

  getInfoForGeneralReceipt(value:ServiceModel[]){
    this.serviceProvider.getProviderCompanyForHouse().subscribe(providers=>{
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


}
