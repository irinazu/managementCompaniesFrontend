import {ServiceModel} from "./service-model";

export class Payment {
  service:ServiceModel=new ServiceModel();
  //user_system_id:;
  date:Date|undefined;
  time:string="";
  summa:number=0;
}
