import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Voting} from "../modules/voting";
import {UserSystem} from "../modules/user-system";
import {ImageModel} from "../modules/image-model";
import {RoleUserSystem} from "../modules/role-user-system";

@Injectable({
  providedIn: 'root'
})
export class UserSystemService {

  private URLForMap="http://localhost:8080/userInfo"
  constructor(private httpClient:HttpClient) { }

  //login in
  login(userSystem:UserSystem):Observable<UserSystem>{
    return this.httpClient.post<UserSystem>(`${this.URLForMap}/login`,userSystem);
  }

  //находим конкретного пользователя
  findUser(id:number):Observable<UserSystem>{
    return this.httpClient.get<UserSystem>(`${this.URLForMap}/findUser/${id}`);
  }

  //находим конкретного пользователя по заявлению
  findUserByRequest(id:number):Observable<UserSystem>{
    return this.httpClient.get<UserSystem>(`${this.URLForMap}/findUserByRequest/${id}`);
  }

  //добавляем работника
  addWorker(idMC: number, worker: UserSystem,idPost:number) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/addWorker/${idMC}/${idPost}`,worker);
  }

  //обновляем работника
  updateWorker(worker: UserSystem,idPost:number) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/updateWorker/${idPost}`,worker);
  }

  //обновляем email
  changeEmail(userId:number,email:string) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/changeEmail/${userId}`,email);
  }

  //обновляем phone
  changePhone(userId:number,phone:string) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/changePhone/${userId}`,phone);
  }

  //обновляем phone пароля
  changePassword(userId:number,password:string) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/changePassword/${userId}`,password);
  }

  //подтверждаем обновление пароля
  confirmChangePassword(userId:number,password:string) :Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.URLForMap}/confirmChangePassword/${userId}`,password);
  }

  //смена аватара
  changeAvatar(userId:number,formData:FormData) :Observable<ImageModel>{
    return this.httpClient.post<ImageModel>(`${this.URLForMap}/changeAvatar/${userId}`,formData);
  }

  //смена changeFlagOnTakeNews
  changeFlagOnTakeNews(userId:number,flag:boolean) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/changeFlagOnTakeNews/${userId}`,flag);
  }

  //добавляем работника
  addHead(worker: UserSystem) :Observable<any>{
    return this.httpClient.post<any>(`${this.URLForMap}/addHead`,worker);
  }

  //добавляем жителя
  addUser(idHouse:number,idEntrance:number,user: UserSystem) :Observable<Boolean>{
    return this.httpClient.post<Boolean>(`${this.URLForMap}/addUser/${idHouse}/${idEntrance}`,user);
  }

  //добавляем жителя
  finaleRegistrationUser(idMC:number,user: UserSystem) :Observable<number>{
    return this.httpClient.post<number>(`${this.URLForMap}/finaleRegistrationUser/${idMC}`,user);
  }

  //
  getPostsForMC() :Observable<RoleUserSystem[]>{
    return this.httpClient.get<RoleUserSystem[]>(`${this.URLForMap}/getPostsForMC`);
  }
}
