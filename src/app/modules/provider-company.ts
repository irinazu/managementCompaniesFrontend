import {ServiceDescription} from "./service-description";

export class ProviderCompany {
  id:number=0;
  title:string="";
  town:string="";
  street:string="";
  house:string="";
  phone:string="";
  email:string="";
  nameOfBoss:string="";
  patronymicOfBoss:string="";
  surnameOfBoss:string="";
  timeOfWork:string="";
  serviceDescriptionForProvider:ServiceDescription=new ServiceDescription();

}
