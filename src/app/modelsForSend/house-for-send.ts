import {ImageModel} from "../modules/image-model";
import {RepairWork} from "../modules/repair-work";
import {Entrance} from "../modules/entrance";
import {BasementForSend} from "./basement-for-send";
import {RoofForSend} from "./roof-for-send";
import {EntranceForSend} from "./entrance-for-send";

export class HouseForSend {
  id:number=0;
  region:string="";
  town:string="";
  street:string="";
  numberOfHouse:number=0;
  numberOfEntrance:number=0;
  numberOfFloor:number=0;
  lift:boolean=false;
  yearOfConstruction:number=0;
  numberOfFlats:number=0;
  homeCondition:string="";
  problems:string="";
  adjoiningTerritory:string="";
  theHouseItself:ImageModel[]=[];
  basementForSend:BasementForSend= new BasementForSend();
  roofForSend:RoofForSend= new RoofForSend();
  entranceForSend:EntranceForSend[]=[];
}
