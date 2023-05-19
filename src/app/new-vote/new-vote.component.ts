import { Component, OnInit } from '@angular/core';
import {Voting} from "../modules/voting";
import {VoteService} from "../services/vote.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-vote',
  templateUrl: './new-vote.component.html',
  styleUrls: ['./new-vote.component.css']
})
export class NewVoteComponent implements OnInit {

  constructor(private voteService: VoteService,private router:ActivatedRoute) {
    this.router.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.mode = paramMap.get('mode');
      this.openVoteInArray=-1;
      this.ngOnInit();
    });
  }

  allVotes: Voting[] = [];
  votes: Voting[] = [];
  openVoteInArray:number=-1;
  periods:string[]=["Сначала новые","Сначала старые"]
  checkConfirms:string[]=["Отмеченные и неотмеченнные","Отмеченные","Неотмеченные"]
  setTheme = new Set();

  currentCheck:number=-1;
  currentPeriod:number=0;
  currentListTheme:string[]=[];

  mode:string="";
  role:string="";

  ngOnInit(): void {
    this.mode=this.router.snapshot.params['mode'];
    this.role=localStorage.getItem("role")!;

    this.voteService.getAllVoteWithMode(this.mode,Number(localStorage.getItem("id")),this.role)
      .subscribe(value => {
        this.votes=value;
        this.allVotes=[...this.votes];
        this.updateListOfVotes();

      });


    /*this.voteService.getAllVoteForUser().subscribe(value => {
      this.votes = value;
      this.allVotes=[...this.votes];
      this.updateListOfVotes();
      //добавляем темы
      this.votes.forEach(x=>this.setTheme.add(x.theme));
    })*/
  }

  //раскрываем определенное голосование
  clickCertainVote($event: any,i: number) {

    let clickMessage = $event.target;
    if (clickMessage.className != "upArrow") {
      if(this.openVoteInArray!=-1){
        if(i!=this.openVoteInArray){
          console.log(this.openVoteInArray)
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
    if(this.mode=="true"&&this.role!="DISPATCHER"){

      let elem=this.votes[numberInArray].votingOptionSet.find(x=>x.answerCheck)!;
      if(elem){
        //нажали на одно и то же
        if(elem.id===optionId) return;

        //в случае если на другое то старое делаем отрицательным и удаляем вариант ответа
        elem.answerCheck=false;
        elem.voteNumber=elem.voteNumber-1;
      }

      //обновляем новый выбранный элемент
      let newElem=this.votes[numberInArray].votingOptionSet.find(x=>x.id===optionId)!;
      newElem.answerCheck=true;
      newElem.voteNumber=newElem.voteNumber+1;

      //обновляем на сервере
      if(elem){
        this.voteService.updateVoteOption(optionId,elem.id,Number(localStorage.getItem("id"))).subscribe();
      }else {
        this.voteService.updateVoteOption(optionId,-1,Number(localStorage.getItem("id"))).subscribe();
      }

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

  //в зависимости открытые или уже закрытые голосования
  checkMode():boolean {
    return this.mode=="false";
  }

}
