import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../services/services.service";
import {ServiceModel} from "../modules/service-model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-history-of-service',
  templateUrl: './history-of-service.component.html',
  styleUrls: ['./history-of-service.component.css']
})
export class HistoryOfServiceComponent implements OnInit {

  imgUrl:string="";
  services:ServiceModel[]=[];
  constructor(private service:ServicesService,private router:ActivatedRoute) { }

  ngOnInit(): void {
   this.service.getDataForService(this.router.snapshot.params['id']).subscribe(value => {
      this.services=value;
    })
  }

}
