import {Tag} from "./tag";
import {UserSystem} from "./user-system";
import {ManagementCompany} from "./management-company";

export class News {
  id:number=0;
  header:string="";
  content:string="";
  dateOfPublication: Date | undefined;
  tagList:Tag[]=[];
  creator:UserSystem=new UserSystem();
  managementCompanyDTO:ManagementCompany=new ManagementCompany();
}
