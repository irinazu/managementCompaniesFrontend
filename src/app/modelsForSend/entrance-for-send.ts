import {ImageModel} from "../modules/image-model";
import {RepairWorkForSend} from "./repair-work-for-send";

export class EntranceForSend {
  id:number=0;
  numberOfEntrance:number=0;
  photoOfEntrance:ImageModel[]=[];
  repairWorkForSend:RepairWorkForSend[]=[];

}
