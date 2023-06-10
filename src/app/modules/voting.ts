import {VotingOption} from "./voting-option";
import {HouseForSend} from "../modelsForSend/house-for-send";
import {House} from "./house";
import {VotingTheme} from "./voting-theme";
import {UserSystem} from "./user-system";

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
  houses:House[]=[];
  votingThemeDTO:VotingTheme=new VotingTheme();
  deleteOptionsMustDeletingFromServer:VotingOption[]=[];
  housesMustAdding:House[]=[];
  housesMustDeleting:House[]=[];
  notAnsweredUserSystem:UserSystem[]=[];

  allMustAnswer:number=0;
  answered:number=0;
}
