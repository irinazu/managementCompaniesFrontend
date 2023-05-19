import {MeteringDevicesType} from "./metering-devices-type";

export class MeteringDevices {
  id:number=0;
  series:string="";
  startDate:Date=new Date();
  endDate:Date=new Date();
  checkDate:Date=new Date();
  meteringDevicesType:MeteringDevicesType=new MeteringDevicesType();
}
