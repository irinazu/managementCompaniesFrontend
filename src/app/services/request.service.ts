import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HouseForSend} from "../modelsForSend/house-for-send";
import {Request} from "../modules/request";
import {RequestUpdate} from "../modules/request-update";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private URLForMap="http://localhost:8080/request"
  constructor(private httpClient:HttpClient) { }

  getRequestForUser():Observable<Request[]>{
    return this.httpClient.get<Request[]>(`${this.URLForMap}/getRequestForUser`);
  }
  getCertainRequestForUser(id:number):Observable<Request>{
    return this.httpClient.get<Request>(`${this.URLForMap}/getCertainRequestForUser/${id}`);
  }
  getCertainRequestUpdateForUser(id:number):Observable<RequestUpdate[]>{
    return this.httpClient.get<RequestUpdate[]>(`${this.URLForMap}/getCertainRequestUpdateForUser/${id}`);
  }
}
