import {UserSystem} from "./user-system";
import {ImageModel} from "./image-model";

export class MessageAndUser {
  id:number=0;
  content:string="";
  date:string="";
  user_system_id:number=0;
  chat_id:number=0;
  name:string="";
  surname:string="";
  user_system_object:UserSystem=new UserSystem();
  imageModelsForMessage:ImageModel[]=[];

  listImgInNumber:number[]=[];

  setArgs(user_system_id:number,name:string,surname:string,content:string,date:string){
    this.user_system_id=user_system_id;
    this.name=name;
    this.surname=surname;
    this.content=content;
    this.date=date;
  }

  setArgsForUpdate(user_system_id:number,content:string,listImgInNumber:number[]){
    this.user_system_id=user_system_id;
    this.content=content;
    this.listImgInNumber=listImgInNumber;
  }
}
