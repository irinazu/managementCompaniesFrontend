import { Component, OnInit } from '@angular/core';
import {Voting} from "../modules/voting";
import {VoteService} from "../services/vote.service";

@Component({
  selector: 'app-new-vote',
  templateUrl: './new-vote.component.html',
  styleUrls: ['./new-vote.component.css']
})
export class NewVoteComponent implements OnInit {

  constructor(private voteService: VoteService) {}

  allVotes: Voting[] = [];
  votes: Voting[] = [];
  openVoteInArray:number=-1;
  periods:string[]=["Сначала новые","Сначала старые"]
  checkConfirms:string[]=["Отмеченные и неотмеченнные","Отмеченные","Неотмеченные"]
  setTheme = new Set();
  closeOrOpenVoteList:string[]=["Все голосования","Открытые голосования","Закрытые голосования"];

  currentCheck:number=-1;
  currentPeriod:number=0;
  currentListTheme:string[]=[];
  currentCloseOrOpenVote:number=-1;

  ngOnInit(): void {
    this.voteService.getAllVoteForUser().subscribe(value => {
      this.votes = value;
      this.allVotes=[...this.votes];
      this.updateListOfVotes();
      //добавляем темы
      this.votes.forEach(x=>this.setTheme.add(x.theme));
    })
  }

  //раскрываем определенное голосование
  clickCertainVote($event: any,i: number) {
    let clickMessage = $event.target;
    if (clickMessage.className != "upArrow") {
      if(this.openVoteInArray!=-1){
        if(i!=this.openVoteInArray){
          document.getElementsByClassName('certainVote')[this.openVoteInArray].setAttribute('style', "height:150px")
          document.getElementsByClassName('gradientBlock')[this.openVoteInArray].setAttribute('style', "display:block")
        }
      }
      document.getElementsByClassName('certainVote')[i].setAttribute('style', "height:100%")
      document.getElementsByClassName('gradientBlock')[i].setAttribute('style', "display:none")
      this.openVoteInArray=i;
    }
  }

  //подсчет процентов для конкретного варианта
  countPercent(numberInArray: number, numberOfVoice: number): any {

    if (numberOfVoice === 0) {return 0;}
    let generalCount = 0;
    this.votes[numberInArray].votingOptionSet.forEach(x => generalCount += x.voteNumber);
    return (numberOfVoice * 100 / generalCount).toFixed(2);
  }

  //обновляем выбор в голосовании
  enterCheckOption(numberInArray: number, optionId: number){
    let elem=this.votes[numberInArray].votingOptionSet.find(x=>x.answerCheck)!;
    if(elem){
      if(elem.id===optionId) return;
      elem.answerCheck=false;
      elem.voteNumber=elem.voteNumber-1;
    }

    let newElem=this.votes[numberInArray].votingOptionSet.find(x=>x.id===optionId)!;
    newElem.answerCheck=true;
    newElem.voteNumber=newElem.voteNumber+1;

    if(elem){
      this.voteService.updateVoteOption(optionId,elem.id).subscribe();
    }else {
      this.voteService.updateVoteOption(optionId,-1).subscribe();
    }
  }

  //закрываем голосование
  closeVote(i: number) {
    document.getElementsByClassName('certainVote')[i].setAttribute('style', "height:150px")
    document.getElementsByClassName('gradientBlock')[i].setAttribute('style', "display:block")

  }

  //фильтр на периоды
  changePeriod() {
    // @ts-ignore
    this.currentPeriod=document.getElementById('selectPeriod').selectedIndex;
    this.updateListOfVotes();
  }

  //фильтр на отмеченные/неотмеченные
  changeCheck() {
    // @ts-ignore
    this.currentCheck=document.getElementById('selectCheck').selectedIndex;
    this.updateListOfVotes();
  }

  //фильтр списка тем
  changeTheme() {
    this.currentListTheme=[];
    let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let checkbox of markedCheckbox) {
      // @ts-ignore
      this.currentListTheme.push(checkbox.value);
    }
    this.updateListOfVotes();
  }

  //фильтр открытых закрытых голосований
  changeCloseOrOpenVote() {
    // @ts-ignore
    this.currentCloseOrOpenVote=document.getElementById('selectCloseOrOpenVote').selectedIndex;
    this.updateListOfVotes();
  }

  //вся фильтрация по каждому пункту
  updateListOfVotes(){
    this.votes=[...this.allVotes];

    if(this.currentCheck!=-1){
      let listWithCheck=this.votes.filter(x=>x.votingOptionSet.find(i=>i.answerCheck));
      if(this.currentCheck===1){
        this.votes=this.votes.filter(x=>x.votingOptionSet.find(i=>i.answerCheck));
      }else if(this.currentCheck===2){

        let listForDeleteCheck=[];
        for(let i=0;i<this.votes.length;i++){
          if(this.votes[i]==listWithCheck.find(x=>x===this.votes[i])){
            listForDeleteCheck.push(i);
          }
        }
        listForDeleteCheck.forEach(x=>this.votes.splice(x,1));

      }
    }

    if(this.currentListTheme.length!=0){
      let listForDelete=[];
      for(let i=0;i<this.votes.length;i++){
        if(this.votes[i].theme!=this.currentListTheme.find(x=>x===this.votes[i].theme)){
          listForDelete.push(i);
        }
      }
      listForDelete.forEach(x=>this.votes.splice(x,1));
    }

    if(this.currentCloseOrOpenVote!=-1){
      if(this.currentCloseOrOpenVote===1){
        this.votes=this.votes.filter(x=>!x.closed);
      }else if(this.currentCloseOrOpenVote===2){
        this.votes=this.votes.filter(x=>x.closed);
      }
    }

    if(this.currentPeriod!=-1){
      if(this.currentPeriod===0){
        this.votes.sort( function( a , b){
          if(new Date(a.start).getTime() < new Date(b.start).getTime()) return 1;
          if(new Date(a.start).getTime() > new Date(b.start).getTime()) return -1;
          return 0;
        });
      }else {
        this.votes.sort( function( a , b){
          if(new Date(a.start).getTime() > new Date(b.start).getTime()) return 1;
          if(new Date(a.start).getTime() < new Date(b.start).getTime()) return -1;
          return 0;
        });
      }
    }
  }

}
