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

  constructor(private service:ServicesService,private router:ActivatedRoute) { }
  maxMonth:ServiceModel=new ServiceModel();
  minMonth:ServiceModel=new ServiceModel();
  averageMedian:number=0;
  services:ServiceModel[]=[];
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
  monthsChange=[
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Ноября',
    'Декабря',
  ];
  years:any[]=[];

  ngOnInit(): void {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.marginRight = 400;
    chart.padding(40,20,40,20);
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.grid.template.strokeWidth = 0;
    //categoryAxis.title.text = "Local country offices";

    var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeWidth = 1;
    valueAxis.title.text = "кВт*ч";

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
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
    var title = chart.titles.create();
    //title.text = "Электроэнергия";   //!!!!!!!!!!!!
    title.marginBottom=30;
    chart.cursor = new am4charts.XYCursor();

    //Получение данныхс сервера для построения графика
    this.service.getTopDataForService(this.router.snapshot.params['id']).subscribe(value => {
      chart.data=value;
      var start = this.monthsChange[value[0].monthNumber];
      var y = value[0].year;
      var end =  this.months[value[value.length-1].monthNumber];
      var yE = value[value.length-1].year;
      categoryAxis.title.text = "В период с "+start+" "+y+ " по "+end+" "+yE;
      this.indicatorsCount(value);
    })

    this.service.getDataForService(this.router.snapshot.params['id']).subscribe(value => {
      this.services=value;
      title.text = value[0].serviceDescription.title;
      value.forEach(x=>x.month=this.months[x.monthNumber])
    })

    //Года за которые можно получить данные
    this.service.getYears().subscribe(value => {
      this.years=value;
    })
  }

  indicatorsCount(value:any){

    //Минимуму и максимум
    // @ts-ignore
    let minIndex = value.reduce((acc, curr, i) => value[acc].consumption < curr.consumption ? acc : i, 0);
    // @ts-ignore
    let maxIndex = value.reduce((acc, curr, i) => value[acc].consumption > curr.consumption ? acc : i, 0);
    this.minMonth=value[minIndex];
    this.maxMonth=value[maxIndex];

    //Среднее
    var consumptions = [];
    for (var i of value) {
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

  dropDown(){

    var el = document.getElementsByClassName('hideCheck');
    // @ts-ignore
    el[0].style.display === 'none' ? el[0].style.display = 'flex' : el[0].style.display = 'none';
  }


}
