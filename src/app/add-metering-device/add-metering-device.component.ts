import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../services/services.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MeteringDevices} from "../modules/metering-devices";
import {MeteringDevicesType} from "../modules/metering-devices-type";

@Component({
  selector: 'app-add-metering-device',
  templateUrl: './add-metering-device.component.html',
  styleUrls: ['./add-metering-device.component.css']
})
export class AddMeteringDeviceComponent implements OnInit {

  constructor(private serviceService:ServicesService,
              private activeRouter:ActivatedRoute,
              private router:Router) { }

  meteringDevicesIdType:number=0;
  userIdForMeteringDevices:number=0;
  idMC:number=0;
  houseId:number=0;
  idMeteringDevice:number=0;
  meteringDevice:MeteringDevices=new MeteringDevices();
  meteringDeviceType:MeteringDevicesType=new MeteringDevicesType();

  errorSeries:string="";
  errorStartDate:string="";
  errorCheckDate:string="";
  errorEndDate:string="";
  flag:boolean=true;

  dates:Date[]=[];
  arrDate:Date[]=[];

  ngOnInit(): void {
    this.meteringDevicesIdType=this.activeRouter.snapshot.params["meteringDevicesIdType"];
    this.userIdForMeteringDevices=this.activeRouter.snapshot.params["userId"];
    this.idMC=this.activeRouter.snapshot.params["idMC"];
    this.houseId=this.activeRouter.snapshot.params["houseId"];

    this.idMeteringDevice=Number(this.activeRouter.snapshot.params["idMeteringDevice"]);

    //тип ипу
    this.serviceService.getCertainMeteringDeviceType(this.meteringDevicesIdType).subscribe(value => {
      this.meteringDeviceType=value;
    })

    //для обновления
    if(this.idMeteringDevice!=0){
      this.serviceService.getCertainMeteringDevice(this.idMeteringDevice).subscribe(value => {
        this.meteringDevice=value;
        this.arrDate.push(this.meteringDevice.startDate,this.meteringDevice.checkDate,this.meteringDevice.endDate)
        this.dates=[...this.arrDate];
      })
    }
  }

  addMeteringDevice() {
    this.clearError();
    if(this.meteringDevice.series.length==0){
      this.errorSeries="Введите Серию";
      this.flag=false;
    }
    if(this.meteringDevice.startDate==undefined){
      this.errorStartDate="Введите дату установки";
      this.flag=false;
    }
    if(this.meteringDevice.checkDate==undefined){
      this.errorCheckDate="Введите дату проверки";
      this.flag=false;
    }
    if(this.meteringDevice.endDate==undefined){
      this.errorEndDate="Введите дату снятия";
      this.flag=false;
    }

    if(this.flag){
      if(this.idMeteringDevice==0){
        this.serviceService.
        addMeteringDevice(this.meteringDevice,this.userIdForMeteringDevices,this.meteringDevicesIdType).subscribe(value => {
          this.router.navigate(['privateOffice','housesRequests',this.idMC,'usersForHouse',this.houseId,'meteringDevices',this.userIdForMeteringDevices]);
        })
      }else {
        this.serviceService.
        updateMeteringDevice(this.meteringDevice).subscribe(value => {
          this.router.navigate(['privateOffice','housesRequests',this.idMC,'usersForHouse',this.houseId,'meteringDevices',this.userIdForMeteringDevices]);
        })
      }
    }
  }

  clearError(){
    this.flag=true;
    this.errorSeries="";
    this.errorEndDate="";
    this.errorCheckDate="";
    this.errorStartDate="";
  }
}
