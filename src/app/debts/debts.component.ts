import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../services/services.service";
import {ActivatedRoute} from "@angular/router";
import {ServiceModel} from "../modules/service-model";

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit {

  constructor(private service:ServicesService,private router:ActivatedRoute) { }

  services:ServiceModel[]=[];
  generalServiceModel:ServiceModel=new ServiceModel();
  ngOnInit(): void {
    this.service.getDebtsForService(this.router.snapshot.params['id']).subscribe(value => {
      this.services=value;
    })

    this.service.getLastDataForCounter(this.router.snapshot.params['id']).subscribe(value => {
      this.generalServiceModel=value;
    })
  }

}
