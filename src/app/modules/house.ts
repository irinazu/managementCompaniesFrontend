import {RepairWork} from "./repair-work";
import {Entrance} from "./entrance";

export class House {
  id:number=0;
  region:string="";
  town:string="";
  street:string="";
  numberOfHouse:string="";
  numberOfEntrance:string="";
  numberOfFloor:string="";
  lift:boolean=false;
  yearOfConstruction:string="";
  numberOfFlats:string="";
  homeCondition:string="";
  repairWorks:RepairWork[]=[];
  entrances:Entrance[]=[];
  problems:string="";
  photoOfHouse:string="";
  adjoiningTerritory:string="";
  photoOfBasement:string="";
}
