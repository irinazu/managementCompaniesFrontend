import {RepairWork} from "./repair-work";
import {Entrance} from "./entrance";

export class House {
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
  repairWorks:RepairWork[]=[];
  entrances:Entrance[]=[];
  problems:string="";
  photoOfHouse:string="";
  adjoiningTerritory:string="";
  photoOfBasement:string="";
}
