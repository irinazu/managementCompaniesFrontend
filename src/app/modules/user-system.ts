import {ImageModel} from "./image-model";
import {RoleUserSystem} from "./role-user-system";

export class UserSystem {
  id:number=0;
  name:string="";
  surname:string="";
  patronymic:string="";
  email:string="";
  phone:string="";
  accountNumber:string="";
  town:string="";
  street:string="";
  numberOfFlat:string="";
  house:string="";
  password:string="";
  errorPassword:string="";
  errorLogin:string="";
  roleDTO:RoleUserSystem=new RoleUserSystem();

  flagOnTakeNews:boolean=false;

  imgAvatar:ImageModel=new ImageModel();
}
