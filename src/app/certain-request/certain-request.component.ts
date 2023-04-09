import { Component, OnInit } from '@angular/core';
import {RequestUpdate} from "../modules/request-update";
import {RequestService} from "../services/request.service";
import {Request} from "../modules/request";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-certain-request',
  templateUrl: './certain-request.component.html',
  styleUrls: ['./certain-request.component.css']
})
export class CertainRequestComponent implements OnInit {

  certainRequest:Request=new Request();
  blocksOfRequest:RequestUpdate[]=[];
  constructor(private requestService:RequestService,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.requestService.getCertainRequestForUser(this.router.snapshot.params['id']).subscribe(value => {
      this.certainRequest=value;
    })
    this.requestService.getCertainRequestUpdateForUser(this.router.snapshot.params['id']).subscribe(value => {
      this.blocksOfRequest=value;
    })
  }

}
