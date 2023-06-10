import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {House} from "../modules/house";
import {HttpClient} from "@angular/common/http";
import {UserSystem} from "../modules/user-system";
import {HouseUser} from "../modules/house-user";
import {Entrance} from "../modules/entrance";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private URLForMap="http://localhost:8080"
  constructor(private httpClient:HttpClient) { }


  //все дома УК по работнику
  getHousesForMC(idUser:number,idMC:number):Observable<House[]>{
    return this.httpClient.get<House[]>(`${this.URLForMap}/getHousesForMC/${idUser}/${idMC}`);
  }

  //все дома УК по работнику
  getHousesForMCByIdMC(idMC:number):Observable<House[]>{
    return this.httpClient.get<House[]>(`${this.URLForMap}/getHousesForMCByIdMC/${idMC}`);
  }

  //все users дома
  getUsersForHouse(houseId:number):Observable<UserSystem[]>{
    return this.httpClient.get<UserSystem[]>(`${this.URLForMap}/getUsersForHouse/${houseId}`);
  }

  //дом
  getHouse(houseId:number):Observable<House>{
    return this.httpClient.get<House>(`${this.URLForMap}/getHouse/${houseId}`);
  }

  //добавить дом
  addHouse(house:House,idMC:number):Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/addHouse/${idMC}`,house);
  }

  //обновляем дом
  reductionHouse(house:House):Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/reductionHouse`,house);
  }

  //дом для user
  getHouseForCertainUser(userID:number):Observable<House>{
    return this.httpClient.get<House>(`${this.URLForMap}/getHouseForCertainUser/${userID}`);
  }

  getHouseUserByUser(userId: number) :Observable<HouseUser>{
    return this.httpClient.get<HouseUser>(`${this.URLForMap}/getHouseUserByUser/${userId}`);
  }

  //подъезды дома
  getEntranceForHouse(houseId: number) :Observable<Entrance[]>{
    return this.httpClient.get<Entrance[]>(`${this.URLForMap}/getEntranceForHouse/${houseId}`);
  }
}
