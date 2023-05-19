import {Time} from "@angular/common";
import {ManagementCompany} from "./management-company";
import {RequestTheme} from "./request-theme";
import {RequestStatus} from "./request-status";
import {RequestUpdate} from "./request-update";
import {ImageModel} from "./image-model";

export class Request {
    id:number=0;
    date: Date | undefined;
    title:string="";
    town:string="";
    street:string="";
    house:string="";
    flat:string="";
    files:string="";
    commentary:string="";
    publicRequest:string="";
    requestThemeDTO:RequestTheme=new RequestTheme();
    managementCompanyDTO:ManagementCompany=new ManagementCompany();
    lastStatusDTO:RequestStatus=new RequestStatus();
    requestUpdateDTOS:RequestUpdate[]=[];
    imageModelsForRequest:ImageModel[]=[];

    public setArgs(title:string,town:string,street:string,house:string,flat:string,commentary:string,
            requestThemeDTO:RequestTheme, managementCompanyDTO:ManagementCompany){
      this.title=title;
      this.town=town;
      this.street=street;
      this.house=house;
      this.flat=flat;
      this.commentary=commentary;
      this.requestThemeDTO=requestThemeDTO;
      this.managementCompanyDTO=managementCompanyDTO;
    }
}
