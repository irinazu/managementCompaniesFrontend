import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {House} from "../modules/house";
import {ImageModel} from "../modules/image-model";
import {HouseForSend} from "../modelsForSend/house-for-send";
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private URLForMap="http://localhost:8080"
  constructor(private httpClient:HttpClient) { }

  getSocket(){
    return io.io("http://localhost:3000", {transports: ["websocket", "polling", "flashsocket"]});

  }

  getInformationAboutHouse(region:string,town:string,street:string,house:number):Observable<House>{
    return this.httpClient.get<House>(`${this.URLForMap}/${region}/${town}/${street}/${house}`);
  }
  loadImgOnServer(formData:FormData):Observable<any>{
    return this.httpClient.post<Observable<any>>(`${this.URLForMap}/loadImgOnServer`,formData);
  }

  getImgFromServer(directory:string):Observable<Blob[]>{
    return this.httpClient.get<Blob[]>(`${this.URLForMap}/getImgFromServer/${directory}`);
  }

  getImage(directory:string): Observable<ImageModel[]> {
    return this.httpClient.get<ImageModel[]>(`${this.URLForMap}/getFImg/${directory}`);
  }

  getWholeHouse(directory:string):Observable<HouseForSend>{
    return this.httpClient.get<HouseForSend>(`${this.URLForMap}/getImg/${directory}`);

  }
}
