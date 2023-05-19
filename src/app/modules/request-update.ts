import {Time} from "@angular/common";
import {RequestStatus} from "./request-status";
import {ImageModel} from "./image-model";

export class RequestUpdate {
  id:number=0;
  date: Date | undefined;
  commentary:string="";
  userUpdate:boolean=false;
  managementCompanyUpdate:boolean=false;
  file:string="";
  requestStatusDTO:any|undefined;
  reopenFlag:boolean=false;
  requestId:number=0;
  imageModelsForRequestUpdate:ImageModel[]=[];

  setArgs(commentary: string,reopen:boolean) {
    this.commentary = commentary;
    this.reopenFlag = reopen;
  }
}
