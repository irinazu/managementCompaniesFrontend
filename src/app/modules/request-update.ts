import {Time} from "@angular/common";

export class RequestUpdate {
  id:number=0;
  date: Date | undefined;
  time:Time | undefined;
  status:string="";
  commentary:string="";
  userUpdate:boolean=false;
  managementCompanyUpdate:boolean=false;

}
