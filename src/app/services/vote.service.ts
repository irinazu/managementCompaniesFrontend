import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceModel} from "../modules/service-model";
import {Voting} from "../modules/voting";
import {VotingTheme} from "../modules/voting-theme";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private URLForMap="http://localhost:8080/vote"
  constructor(private httpClient:HttpClient) { }

  //все голосования по юзеру
  getAllVoteForUser():Observable<Voting[]>{
    return this.httpClient.get<Voting[]>(`${this.URLForMap}/getAllVoteForUser`);
  }

  //обновление голосования
  updateVoteOption(optionId: number,oldOptionId:number,idUser:number):Observable<any>{
    return this.httpClient.get(`${this.URLForMap}/updateVoteOption/${optionId}/${oldOptionId}/${idUser}`);
  }

  //обновление голосования
  getAllThemeVoting():Observable<VotingTheme[]>{
    return this.httpClient.get<VotingTheme[]>(`${this.URLForMap}/getAllThemeVoting`);
  }

  /*dispatcher*/
  //создание нового голосования
  createVoting(voting:Voting,idUser:number,idMC:number):Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/createVoting/${idUser}/${idMC}`,voting);
  }

  //все голосования с mode
  getAllVoteWithMode(mode:string,idUser:number,role:string,idMC:number):Observable<Voting[]>{
    return this.httpClient.get<Voting[]>(`${this.URLForMap}/getAllVoteWithMode/${mode}/${idUser}/${role}/${idMC}`);
  }

  //определенное голосование
  getCertainVoting(idVoting: number) :Observable<Voting>{
    return this.httpClient.get<Voting>(`${this.URLForMap}/getCertainVoting/${idVoting}`);
  }

  //определенное голосование
  getCertainVotingForPage(idVoting: number,idUser:number) :Observable<Voting>{
    return this.httpClient.get<Voting>(`${this.URLForMap}/getCertainVotingForPage/${idVoting}/${idUser}`);
  }

  //обновление голосования
  updateVoting(voting:Voting):Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/updateVoting`,voting);
  }
}
