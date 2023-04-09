import {number} from "@amcharts/amcharts4/core";
import {ServiceDescription} from "./service-description";

export class ServiceModel {
    id:number=0;
    title:string="";
    tariff:number=0;
    consumption:number|undefined;
    month:string="";
    // @ts-ignore
    dateOfConsumption:Date;
    dutyForThisMonth:number=0;
    repaid=true;
    generalDutyForService:number=0;
    unit:string="";
    serviceDescription:ServiceDescription=new ServiceDescription();
    year:number=0;
    monthNumber:number=0;

    titleOfProviderCompany:string="";
    codeOfProviderCompany:number=0;

}
