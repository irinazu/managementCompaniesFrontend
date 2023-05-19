import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProviderCompany} from "../modules/provider-company";
import {Payment} from "../modules/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private URLForMap="http://localhost:8080/payment"
  constructor(private httpClient:HttpClient) { }

  //Список выплат
  getPaymentForUser(userId:number):Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(`${this.URLForMap}/getPaymentForUser/${userId}`);
  }
}
