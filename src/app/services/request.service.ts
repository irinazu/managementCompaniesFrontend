import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HouseForSend} from "../modelsForSend/house-for-send";
import {Request} from "../modules/request";
import {RequestUpdate} from "../modules/request-update";
import {RequestTheme} from "../modules/request-theme";
import {ServiceModel} from "../modules/service-model";
import {RequestStatus} from "../modules/request-status";
import {House} from "../modules/house";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private URLForMap="http://localhost:8080/request"
  constructor(private httpClient:HttpClient) { }

  //все заявки пользователя
  getRequestForUser(idUser:number):Observable<Request[]>{
    return this.httpClient.get<Request[]>(`${this.URLForMap}/getRequestForUser/${idUser}`);
  }

  //определенная заявка пользователя
  getCertainRequestForUser(id:number):Observable<Request>{
    return this.httpClient.get<Request>(`${this.URLForMap}/getCertainRequestForUser/${id}`);
  }

  //все темы для заявок
  getAllThemeForRequest():Observable<RequestTheme[]>{
    return this.httpClient.get<RequestTheme[]>(`${this.URLForMap}/getAllThemeForRequest`);
  }

  //формирование новой заявки
  createNewRequest(request:Request,idUser:number):Observable<any>{
    return this.httpClient.post<Observable<any>>(`${this.URLForMap}/createRequest/${idUser}`,request);
  }

  //формирование новой заявки с файлами
  createRequestImg(formData:FormData,id:number):Observable<any>{
    return this.httpClient.post<Observable<any>>(`${this.URLForMap}/createRequestImg/${id}`,formData);
  }

  //формирование нового обновления заявки
  createNewRequestUpdate(requestUpdate:RequestUpdate,idRequest:number,idUser:number):Observable<RequestUpdate>{
    return this.httpClient.post<RequestUpdate>(`${this.URLForMap}/createNewRequestUpdate/${idRequest}/${idUser}`,requestUpdate);
  }

  //формирование нового обновления заявки с файлами
  createNewRequestUpdateImg(formData:FormData,id:number):Observable<RequestUpdate>{
    return this.httpClient.post<RequestUpdate>(`${this.URLForMap}/createNewRequestUpdateImg/${id}`,formData);
  }


  /*DISPATCHER*/
  //все заявки диспетчера по УК
  getRequestsForUser(mode:string,idUser:number,role:string):Observable<Request[]>{
    return this.httpClient.get<Request[]>(`${this.URLForMap}/getRequestsForUser/${mode}/${idUser}/${role}`);
  }

  //список статутсов
  getStatuses():Observable<RequestStatus[]>{
    return this.httpClient.get<RequestStatus[]>(`${this.URLForMap}/getStatuses`);
  }

}
