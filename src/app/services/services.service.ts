import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Request} from "../modules/request";
import {ServiceModel} from "../modules/service-model";
import {ServiceDescription} from "../modules/service-description";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private URLForMap="http://localhost:8080/service"
  constructor(private httpClient:HttpClient) { }

  //последний блок данных по услуге
  getLastDataForCounter(service:number):Observable<ServiceModel>{
    return this.httpClient.get<ServiceModel>(`${this.URLForMap}/getLastDataForCounter/${service}`);
  }

  //формирование услуги со счетчика
  createNewDataForCounter(service:ServiceModel):Observable<any>{
    return this.httpClient.post<Observable<any>>(`${this.URLForMap}/createNewDataForCounter`,service);
  }


  getDataForService(service:number):Observable<ServiceModel[]>{
    return this.httpClient.get<ServiceModel[]>(`${this.URLForMap}/getDataForService/${service}`);
  }

  //берем для статистики последние 12 блоков данных
  getTopDataForService(service:number):Observable<ServiceModel[]>{
    return this.httpClient.get<ServiceModel[]>(`${this.URLForMap}/getTopDataForService/${service}`);
  }

  //формируем историю услуги
  getAllDescriptionService():Observable<ServiceDescription[]>{
    return this.httpClient.get<ServiceDescription[]>(`${this.URLForMap}/getAllDescriptionService`);
  }

  //Берем данные по описанию услуги
  getCertainDescriptionService(service:number):Observable<ServiceDescription>{
    return this.httpClient.get<ServiceDescription>(`${this.URLForMap}/getCertainDescriptionService/${service}`);
  }

  //Берем данные по долгам улуги
  getDebtsForService(service:number):Observable<ServiceModel[]>{
    return this.httpClient.get<ServiceModel[]>(`${this.URLForMap}/getDebtsForService/${service}`);
  }

  //Берем данные по месяцам для общего пункта
  getAllServicesForDate(year:number,month:number):Observable<ServiceModel[]>{
    return this.httpClient.get<ServiceModel[]>(`${this.URLForMap}/getAllServicesForDate/${year}/${month}`);
  }

  //Список лет
  getYears():Observable<number[]>{
    return this.httpClient.get<number[]>(`${this.URLForMap}/getYears`);
  }


}
