import {Entrance} from "./entrance";

export class RepairWork {
  id:number=0;
  date:string="";
  description:string="";
  company:string="";
  linkOfPhotoBefore:string="";
  linkOfPhotoAfter:string="";
  kindOfWork:string="";
  entrances:Entrance[]=[];
  repairWorks:RepairWork[]=[];

}
