import {VotingOption} from "./voting-option";
import {HouseForSend} from "../modelsForSend/house-for-send";

export class Voting {
  id:number=0;

  title:string="";
  theme:string="";
  description:string="";
  start:string="";
  closed:boolean=false;
  files:string="";
  endOfVoting:string="";

  votingOptionSet:VotingOption[]=[];
  houses:HouseForSend[]=[];
}
