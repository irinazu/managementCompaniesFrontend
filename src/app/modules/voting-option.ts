import {UserSystem} from "./user-system";

export class VotingOption {
  id:number=0;
  option:string="";
  voteNumber:number=0;
  answerCheck:boolean=false;
  userSystemDTOS:UserSystem[]=[];
}
