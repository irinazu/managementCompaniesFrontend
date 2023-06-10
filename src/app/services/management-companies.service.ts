import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../modules/house";
import {ManagementCompany} from "../modules/management-company";
import {UserSystem} from "../modules/user-system";
import {ManagementCompanyStatus} from "../modules/management-company-status";

@Injectable({
  providedIn: 'root'
})
export class ManagementCompaniesService {

  private URLForMap="http://localhost:8080/managementCompanies"
  constructor(private httpClient:HttpClient) { }

  //все УК
  getAllMC():Observable<ManagementCompany[]>{
    return this.httpClient.get<ManagementCompany[]>(`${this.URLForMap}/getAllMC`);
  }

  //УК
  getCertainMC(idMC:number):Observable<ManagementCompany>{
    return this.httpClient.get<ManagementCompany>(`${this.URLForMap}/getCertainMC/${idMC}`);
  }

  //УК for worker
  getCertainMCByWorkerMC(idUser:number):Observable<ManagementCompany>{
    return this.httpClient.get<ManagementCompany>(`${this.URLForMap}/getCertainMCByWorkerMC/${idUser}`);
  }

  //УК for head
  getAllMCForHead(idUser:number):Observable<ManagementCompany[]>{
    return this.httpClient.get<ManagementCompany[]>(`${this.URLForMap}/getAllMCForHead/${idUser}`);
  }

  //возвращаем всех работников УК
  getAllWorkersForMC(idMC:number):Observable<UserSystem[]>{
    return this.httpClient.get<UserSystem[]>(`${this.URLForMap}/getAllWorkersForMC/${idMC}`);
  }

  //УК с определенным статусом
  getMCForStatus(status: number) :Observable<ManagementCompany[]>{
    return this.httpClient.get<ManagementCompany[]>(`${this.URLForMap}/getMCForStatus/${status}`);
  }

  //все статусы УК
  getAllStatusMC() :Observable<ManagementCompanyStatus[]>{
    return this.httpClient.get<ManagementCompanyStatus[]>(`${this.URLForMap}/getAllStatusMC`);
  }

  //все статусы УК
  updateStatusFroCertainMC(idMC:number,idStatus:number,causeRejection:string) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/updateStatusFroCertainMC/${idMC}/${idStatus}`,causeRejection);
  }

  //добавляем УК
  addMC(idHead:number,mc:ManagementCompany) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/addMC/${idHead}`,mc);
  }

  //УК по дому
  getMCByHouse(idHouse: number):Observable<ManagementCompany>{
    return this.httpClient.get<ManagementCompany>(`${this.URLForMap}/getMCByHouse/${idHouse}`);
  }
}
