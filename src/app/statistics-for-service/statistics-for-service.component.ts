import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {ServicesService} from "../services/services.service";
import {ServiceModel} from "../modules/service-model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-statistics-for-service',
  templateUrl: './statistics-for-service.component.html',
  styleUrls: ['./statistics-for-service.component.css']
})
export class StatisticsForServiceComponent implements OnInit {

  constructor(private service:ServicesService,private router:ActivatedRoute) {
    this.router.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = paramMap.get('id');
      this.ngOnInit();
    });
  }
  maxMonth:ServiceModel=new ServiceModel();
  minMonth:ServiceModel=new ServiceModel();
  averageMedian:number=0;
  services:ServiceModel[]=[];
  months=['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь',];
  monthsChange=['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Ноября', 'Декабря',];
  years:any[]=[];

  chart:any;
  title:any;
  categoryAxis:any;
  valueAxis:any;

  userId:number=0;
  serviceDescriptionId:number=0;

  ngOnInit(): void {
    this.userId=Number(localStorage.getItem("id"));
    this.serviceDescriptionId=Number(this.router.snapshot.params['id']);

    this.chart = am4core.create("chartdiv", am4charts.XYChart);

    this.chart.marginRight = 400;
    this.chart.padding(40,20,40,20);
    this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    this.categoryAxis.dataFields.category = "month";
    this.categoryAxis.renderer.grid.template.location = 0;
    this.categoryAxis.renderer.minGridDistance = 20;
    this.categoryAxis.renderer.grid.template.strokeWidth = 0;

    this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    this.valueAxis.renderer.grid.template.strokeWidth = 1;

    // Create series
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "consumption";
    series.dataFields.categoryX = "month";
    series.name = "Research";
    series.tooltipText = "{name}: [bold]{valueY}[/]";

    series.heatRules.push({
      "target": series.columns.template,
      "property": "fill",
      "min": am4core.color("rgb(117,227,195)"),
      "max": am4core.color("rgb(87,150,131)"),
      "dataField": "valueY"
    });
    series.columns.template.width = am4core.percent(70);
    this.title = this.chart.titles.create();
    this.title.marginBottom=30;
    this.chart.cursor = new am4charts.XYCursor();

    this.getNewDataForNewPeriod(0)

    this.getYears();
  }

  //фильтр по временному промежутку
  getValue(){
    // @ts-ignore
    let valueYear = document.getElementById("selectYear").value;
    if(valueYear===0){
      this.getNewDataForNewPeriod(0)
    }else {
      this.getNewDataForNewPeriod(valueYear)
    }
  }

  //Получение данныхс сервера для построения графика
  getNewDataForNewPeriod(valueYear:number){

    //Получение данныхс сервера для построения графика
    this.service.getTopDataForService(this.serviceDescriptionId,valueYear,this.userId).subscribe(value => {

      this.services=value;
      this.title.text = value[0].serviceDescription.title;
      this.title.fontSize="22";

      value.forEach(x=>x.month=this.months[x.monthNumber])

      this.chart.data=value;
      this.valueAxis.title.text =value[0].unit;

      let start = this.monthsChange[value[0].monthNumber];
      let y = value[0].year;
      let end =  this.months[value[value.length-1].monthNumber];
      let yE = value[value.length-1].year;
      this.categoryAxis.title.text = "В период с "+start+" "+y+ " по "+end+" "+yE;
      this.indicatorsCount(value);
    })
  }

  dropDown(){
    let el = document.getElementsByClassName('hideCheck');
    // @ts-ignore
    el[0].style.display === 'none' ? el[0].style.display = 'flex' : el[0].style.display = 'none';
  }

  //Года за которые можно получить данные
  getYears(){
    this.service.getYears().subscribe(value => {
      this.years=value;
    })
  }

  //подсчет среднего, минимального, большего
  indicatorsCount(value:any){

    //Минимуму и максимум
    // @ts-ignore
    let minIndex = value.reduce((acc, curr, i) => value[acc].consumption < curr.consumption ? acc : i, 0);
    // @ts-ignore
    let maxIndex = value.reduce((acc, curr, i) => value[acc].consumption > curr.consumption ? acc : i, 0);
    this.minMonth=value[minIndex];
    this.maxMonth=value[maxIndex];

    //Среднее
    let consumptions = [];
    for (let i of value) {
      consumptions.push(i.consumption);
    }

    consumptions.sort( function( a , b){
      if(a > b) return 1;
      if(a < b) return -1;
      return 0;
    });

    let len=consumptions.length;
    if(len%2==0){
      this.averageMedian=(consumptions[len/2-1]+consumptions[len/2])/2;
    }else {
      this.averageMedian=consumptions[(len-1)/2];
    }
  }

}
