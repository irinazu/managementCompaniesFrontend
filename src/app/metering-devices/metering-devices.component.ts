import { Component, OnInit } from '@angular/core';
import {MeteringDevices} from "../modules/metering-devices";
import {ServicesService} from "../services/services.service";
import {ActivatedRoute} from "@angular/router";
import {MeteringDevicesType} from "../modules/metering-devices-type";
import {HouseService} from "../services/house.service";
import {HouseUser} from "../modules/house-user";
import {ServiceModel} from "../modules/service-model";

@Component({
  selector: 'app-metering-devices',
  templateUrl: './metering-devices.component.html',
  styleUrls: ['./metering-devices.component.css']
})
export class MeteringDevicesComponent implements OnInit {

  constructor(private serviceService:ServicesService,
              private activeRouter:ActivatedRoute,
              private userServiceHouse:HouseService) { }
  meteringDevices:MeteringDevices[]=[];

  userIdForMeteringDevices:number=0;
  houseUser:HouseUser=new HouseUser();

  ngOnInit(): void {
    this.userIdForMeteringDevices=Number(this.activeRouter.snapshot.params["userId"]);

    this.userServiceHouse.getHouseUserByUser(this.userIdForMeteringDevices).subscribe(value => {
      this.houseUser=value;
    })

    //ипу
    this.serviceService.getMeteringDevicesForUser(this.userIdForMeteringDevices).subscribe(value => {
      this.meteringDevices=value;
      console.log(this.meteringDevices)
    })

  }

}
