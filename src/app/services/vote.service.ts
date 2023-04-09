import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceModel} from "../modules/service-model";
import {Voting} from "../modules/voting";

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
  updateVoteOption(optionId: number,oldOptionId:number):Observable<any>{
    return this.httpClient.get(`${this.URLForMap}/updateVoteOption/${optionId}/${oldOptionId}`);
  }
}
