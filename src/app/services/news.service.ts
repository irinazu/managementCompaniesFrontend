import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Voting} from "../modules/voting";
import {Tag} from "../modules/tag";
import {ServiceModel} from "../modules/service-model";
import {News} from "../modules/news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private URL="http://localhost:8080/news"
  constructor(private httpClient:HttpClient) { }

  //все тэги
  getAllTags():Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(`${this.URL}/getAllTags`);
  }

  //создать новую статью
  createNewNews(newNews:News,idWorker:number,idMC:number):Observable<any>{
    return this.httpClient.post<Observable<any>>(`${this.URL}/createNews/${idWorker}/${idMC}`,newNews);
  }

  //создать новую статью
  updateNews(newNews:News):Observable<any>{
    return this.httpClient.post<Observable<any>>(`${this.URL}/updateNews`,newNews);
  }

  //все статьи
  getAllNews(idUser:number,role:string,tag:number):Observable<News[]>{
    return this.httpClient.get<News[]>(`${this.URL}/getAllNews/${idUser}/${role}/${tag}`);
  }

  //определенная статья
  getCertainNews(id:number):Observable<News>{
    return this.httpClient.get<News>(`${this.URL}/getCertainNews/${id}`);
  }

  /*dispatcher*/
  //определенная статья
  getAllNewsCreatedByWorker(id:string,tag:number):Observable<News[]>{
    return this.httpClient.get<News[]>(`${this.URL}/getAllNewsCreatedByWorker/${id}/${tag}`);
  }

  getAllNewsForMC(idMC: number,tag:number) :Observable<News[]>{
    return this.httpClient.get<News[]>(`${this.URL}/getAllNewsForMC/${idMC}/${tag}`);
  }
}
