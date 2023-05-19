import {House} from "./house";
import {ManagementCompanyStatus} from "./management-company-status";

export class ManagementCompany {
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
  inn:string="";
  kpp:string="";
  checkingAccount:string="";
  correspondentAccount:string="";
  bankTitle:string="";
  bicBank:string="";
  causeRejection:string="";

  housesDTO:House[]=[];
  managementCompanyStatusDTO:ManagementCompanyStatus=new ManagementCompanyStatus();
}
