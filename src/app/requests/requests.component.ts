import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {Request} from "../modules/request";
import {ActivatedRoute} from "@angular/router";
import {UserSystem} from "../modules/user-system";
import {UserSystemService} from "../services/user-system.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {

  requests:Request[]=[];
  idUser:number=-1;
  mode:string="";
  role:string="";

  userSystem:UserSystem=new UserSystem();
  showUser:boolean=false;
  constructor(private requestService:RequestService,private router: ActivatedRoute,private userService:UserSystemService) {
    this.router.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.mode = paramMap.get('mode');
      this.ngOnInit();
    });
  }

  ngOnInit(): void {

    this.mode=this.router.snapshot.params['mode'];
    this.role=localStorage.getItem("role")!;
    this.idUser=Number(localStorage.getItem("id"))!;

    //запрос на открытые-закрытые
    if(this.mode=='true'||this.mode=='false'){
      this.requestService.getRequestsForUser(this.mode,this.idUser,this.role).subscribe(value => {
        this.requests=value;
        this.sortRequests(this.requests);
      })
      //запрос на конкретного юзера
    }else {
      this.showUser=true;
      this.userService.findUser(Number(this.mode)).subscribe(user=>{
        this.userSystem=user;
      })
      this.requestService.getRequestsForUser('true',Number(this.mode),'USER').subscribe(value => {
        this.requests=value;
        this.sortRequests(this.requests);
      })
    }

  }

  checkStatus(req:Request,status:string):boolean {
    return req.lastStatusDTO.titleOfStatus === status;
  }

  //сортировка обновлений
  sortRequests(requests:Request[]) {
    requests.sort( function( a , b){
      if(new Date(a.date!).getTime() < new Date(b.date!).getTime()) return 1;
      if(new Date(a.date!).getTime() > new Date(b.date!).getTime()) return -1;
      return 0;
    });
  }
}
