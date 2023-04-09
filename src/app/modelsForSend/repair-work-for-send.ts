import {ImageModel} from "../modules/image-model";

export class RepairWorkForSend {
  id:number=0;
  date:string="";
  description:string="";
  company:string="";
  photoBefore:ImageModel[]=[];
  photoAfter:ImageModel[]=[];
  kindOfWork:string="";
}
