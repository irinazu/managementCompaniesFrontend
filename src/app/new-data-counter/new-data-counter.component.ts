import {Component, Input, OnInit} from '@angular/core';
import {ServicesService} from "../services/services.service";
import {ServiceModel} from "../modules/service-model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-data-counter',
  templateUrl: './new-data-counter.component.html',
  styleUrls: ['./new-data-counter.component.css']
})
export class NewDataCounterComponent implements OnInit {

  service:ServiceModel=new ServiceModel();
  newDataForService:ServiceModel=new ServiceModel();
  consumption:number|undefined;

  constructor(private serviceForData:ServicesService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceForData.getLastDataForCounter(this.router.snapshot.params['id']).subscribe(value => {
      this.service=value;
    })
  }
  submitData(){
    this.newDataForService.consumption=this.consumption;
    this.newDataForService.serviceDescription.id=this.router.snapshot.params['id'];
    this.serviceForData.createNewDataForCounter(this.newDataForService).subscribe();
    this.consumption=undefined;
    location.reload();
  }

}
