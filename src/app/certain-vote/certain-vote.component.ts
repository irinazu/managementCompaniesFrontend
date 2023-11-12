import { Component, OnInit } from '@angular/core';
import {VoteService} from "../services/vote.service";
import {ActivatedRoute} from "@angular/router";
import {Voting} from "../modules/voting";
import * as io from "socket.io-client";

@Component({
  selector: 'app-certain-vote',
  templateUrl: './certain-vote.component.html',
  styleUrls: ['./certain-vote.component.css']
})
export class CertainVoteComponent implements OnInit {

  constructor(private voteService: VoteService,private router:ActivatedRoute) {}

  idVote:number=0;
  idUser:number=0;
  vote:Voting=new Voting();
  role:string="";
  socket: any;
  mode:string="";
  ngOnInit(): void {
    this.mode=this.router.snapshot.params['mode'];
    this.idVote=this.router.snapshot.params["idVote"];
    this.idUser=Number(localStorage.getItem("id"))!;
    this.role=localStorage.getItem("role")!;
    this.subscribeUpdateVote()

    this.voteService.getCertainVotingForPage(this.idVote,this.idUser).subscribe(value => {
      this.vote=value;
    });
  }
  subscribeUpdateVote(){
    this.socket = io.io("http://localhost:3000", {transports: ["websocket", "polling", "flashsocket"]});
    this.socket.emit("joinToRoom", "vote_"+this.vote.id);

    //Добавляет новопришедшие обновления
    this.socket.on("takeNewUpdateVote", (voteId:number,optionIdNew:number,optionIdOld:number,idUser:number) => {

      if(optionIdOld==-1){
        let user=this.vote.notAnsweredUserSystem.find(x=>x.id==idUser)!;
        let newOption=this.vote.votingOptionSet.find(x=>x.id==optionIdNew)!;
        newOption.userSystemDTOS.push(user);

        //обновляем новый выбранный элемент
        //newOption.answerCheck=true;
        newOption.voteNumber=newOption.voteNumber+1;
      }else {
        let newOption=this.vote.votingOptionSet.find(x=>x.id==optionIdNew)!;
        let oldOption=this.vote.votingOptionSet.find(x=>x.id==optionIdOld)!;
        let user=oldOption.userSystemDTOS.find(x=>x.id==idUser)!;
        let indexUserInOldOption=oldOption.userSystemDTOS.indexOf(user);
        newOption.userSystemDTOS.push(user);
        oldOption.userSystemDTOS.splice(indexUserInOldOption,1);

        //oldOption.answerCheck=false;
        oldOption.voteNumber=oldOption.voteNumber-1;

        //обновляем новый выбранный элемент
        //newOption.answerCheck=true;
        newOption.voteNumber=newOption.voteNumber+1;
      }
    })
  }
  //подсчет процентов для конкретного варианта
  countPercent(numberOfVoice: number,vote:Voting): any {
    console.log(numberOfVoice+" numberOfVoice")
    if (numberOfVoice === 0) {return 0;}
    let generalCount = 0;
    this.vote.votingOptionSet.forEach(x => generalCount += x.voteNumber);
    //this.votes[numberInArray].votingOptionSet.forEach(x => generalCount += x.voteNumber);
    return (numberOfVoice * 100 / generalCount).toFixed(2);
  }

  //в зависимости открытые или уже закрытые голосования
  checkMode():boolean {
    return this.mode=="false";
  }

  //обновляем выбор в голосовании
  enterCheckOption(optionId: number,voteId:number){
    if(this.mode=="true"&&this.role=="USER"){

      let elem=this.vote.votingOptionSet.find(x=>x.answerCheck)!;
      if(elem){
        //нажали на одно и то же
        if(elem.id===optionId) return;

        //в случае если на другое то старое делаем отрицательным и удаляем вариант ответа
        elem.answerCheck=false;
        elem.voteNumber=elem.voteNumber-1;
      }

      //обновляем новый выбранный элемент
      let newElem=this.vote.votingOptionSet.find(x=>x.id===optionId)!;
      newElem.answerCheck=true;
      newElem.voteNumber=newElem.voteNumber+1;

      //обновляем на сервере
      if(elem){
        this.voteService.updateVoteOption(optionId,elem.id,this.idUser).subscribe(value => {
          this.socket.emit("updateVote",voteId,optionId,elem.id,this.idUser);
        });
      }else {
        this.voteService.updateVoteOption(optionId,-1,this.idUser).subscribe(value => {
          this.socket.emit("updateVote",voteId,optionId,-1,this.idUser);
        });
      }

    }
  }
}
