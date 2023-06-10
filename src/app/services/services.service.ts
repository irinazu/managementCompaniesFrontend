import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Request} from "../modules/request";
import {ServiceModel} from "../modules/service-model";
import {ServiceDescription} from "../modules/service-description";
import {FlatUser} from "../modules/flat-user";
import {MeteringDevices} from "../modules/metering-devices";
import {MeteringDevicesType} from "../modules/metering-devices-type";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private URLForMap = "http://localhost:8080/service"

  constructor(private httpClient: HttpClient) {
  }

  //последний блок данных по услуге
  getLastDataForCounter(service: number, userId: number): Observable<ServiceModel> {
    return this.httpClient.get<ServiceModel>(`${this.URLForMap}/getLastDataForCounter/${service}/${userId}`);
  }

  //формирование услуги со счетчика
  createNewDataForCounter(service: ServiceModel, userId: number): Observable<ServiceModel> {
    return this.httpClient.post<ServiceModel>(`${this.URLForMap}/createNewDataForCounter/${userId}`, service);
  }

  //собираем все квитанции определенной услуги
  getDataForService(serviceDescription: number, userId: number): Observable<FlatUser[]> {
    return this.httpClient.get<FlatUser[]>(`${this.URLForMap}/getDataForService/${serviceDescription}/${userId}`);
  }

  //берем для статистики последние 12 блоков данных
  getTopDataForService(service: number, year: number, userId: number): Observable<ServiceModel[]> {
    return this.httpClient.get<ServiceModel[]>(`${this.URLForMap}/getTopDataForService/${service}/${year}/${userId}`);
  }

  //формируем историю услуги
  getAllDescriptionService(): Observable<ServiceDescription[]> {
    return this.httpClient.get<ServiceDescription[]>(`${this.URLForMap}/getAllDescriptionService`);
  }

  //Берем данные по описанию услуги
  getCertainDescriptionService(service: number): Observable<ServiceDescription> {
    return this.httpClient.get<ServiceDescription>(`${this.URLForMap}/getCertainDescriptionService/${service}`);
  }

  //Берем данные по долгам улуги
  getDebtsForService(service: number, userId: number): Observable<FlatUser[]> {
    return this.httpClient.get<FlatUser[]>(`${this.URLForMap}/getDebtsForService/${service}/${userId}`);
  }

  //Берем данные по месяцам для общего пункта
  getAllServicesForDate(year: number, month: number, userId: number): Observable<FlatUser> {
    return this.httpClient.get<FlatUser>(`${this.URLForMap}/getAllServicesForDate/${year}/${month}/${userId}`);
  }

  //Список лет
  getYears(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.URLForMap}/getYears`);
  }

  //берем определенную услугу за определенный период
  getCertainService(id: number, year: number, month: number, userId: number): Observable<FlatUser> {
    return this.httpClient.get<FlatUser>(`${this.URLForMap}/getCertainService/${id}/${year}/${month}/${userId}`);
  }

  //долги по дому
  getGeneralDutyWithDetails(houseId: number): Observable<FlatUser[]> {
    return this.httpClient.get<FlatUser[]>(`${this.URLForMap}/getGeneralDutyWithDetails/${houseId}`);
  }

  //приборы учета на определенный дом
  getMeteringDevices(houseId: number): Observable<FlatUser[]> {
    return this.httpClient.get<FlatUser[]>(`${this.URLForMap}/getMeteringDevices/${houseId}`);
  }

  //квитанции по дому
  getAllUsersWithServicesForDate(houseId: number, year: number, month: number): Observable<FlatUser[]> {
    return this.httpClient.get<FlatUser[]>(`${this.URLForMap}/getAllUsersWithServicesForDate/${houseId}/${year}/${month}`);
  }

  //услуги за определенный год
  getServicesByYear(serviceDescriptionId: number, year: number, userId: number): Observable<FlatUser[]> {
    return this.httpClient.get<FlatUser[]>(`${this.URLForMap}/getServicesByYear/${serviceDescriptionId}/${year}/${userId}`);
  }

  //услуги за определенный месяц
  getServicesByMonth(serviceDescriptionId: number, indexOfMonth: number, userId: number): Observable<FlatUser[]> {
    return this.httpClient.get<FlatUser[]>(`${this.URLForMap}/getServicesByMonth/${serviceDescriptionId}/${indexOfMonth}/${userId}`);
  }

  //ипу для жителя
  getMeteringDevicesForUser(userIdForMeteringDevices: number): Observable<MeteringDevices[]> {
    return this.httpClient.get<MeteringDevices[]>(`${this.URLForMap}/getMeteringDevicesForUser/${userIdForMeteringDevices}`);
  }

  //добавление ипу
  addMeteringDevice(meteringDevice: MeteringDevices, userIdForMeteringDevices: number, meteringDevicesIdType: number): Observable<any> {
    return this.httpClient.post<any>(`${this.URLForMap}/addMeteringDevice/${userIdForMeteringDevices}/${meteringDevicesIdType}`, meteringDevice);
  }

  //определенный ипу
  getCertainMeteringDevice(idMeteringDevice: number): Observable<MeteringDevices> {
    return this.httpClient.get<MeteringDevices>(`${this.URLForMap}/getCertainMeteringDevice/${idMeteringDevice}`);
  }

  //обновление ипу
  updateMeteringDevice(meteringDevice: MeteringDevices): Observable<any> {
    return this.httpClient.post<any>(`${this.URLForMap}/updateMeteringDevice`, meteringDevice);
  }

  //определенный тип ипу
  getCertainMeteringDeviceType(idMeteringDeviceType: number): Observable<MeteringDevicesType> {
    return this.httpClient.get<MeteringDevicesType>(`${this.URLForMap}/getCertainMeteringDeviceType/${idMeteringDeviceType}`);
  }

  //последние блоки данных по услугам
  getLastDataForCounters(userId: number): Observable<ServiceModel> {
    return this.httpClient.get<ServiceModel>(`${this.URLForMap}/getLastDataForCounters/${userId}`);
  }
}
