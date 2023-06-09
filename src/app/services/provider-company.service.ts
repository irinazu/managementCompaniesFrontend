import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProviderCompany} from "../modules/provider-company";
import {Observable} from "rxjs";
import {ManagementCompany} from "../modules/management-company";

@Injectable({
  providedIn: 'root'
})
export class ProviderCompanyService {

  private URLForMap="http://localhost:8080/provider"
  constructor(private httpClient:HttpClient) { }

  //Список поставщиков
  getProviderCompanyForHouse():Observable<ProviderCompany[]>{
    return this.httpClient.get<ProviderCompany[]>(`${this.URLForMap}/getProviderCompanyForHouse`);
  }

  //Список поставщиков Адекватная версия
  getProviderCompaniesForHouse(idHouse:number):Observable<ProviderCompany[]>{
    return this.httpClient.get<ProviderCompany[]>(`${this.URLForMap}/getProviderCompaniesForHouse/${idHouse}`);
  }
}
