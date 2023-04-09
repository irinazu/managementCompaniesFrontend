import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ServicesService} from "../services/services.service";
import {ServiceDescription} from "../modules/service-description";

@Component({
  selector: 'app-list-of-services',
  templateUrl: './list-of-services.component.html',
  styleUrls: ['./list-of-services.component.css'],
})
export class ListOfServicesComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<boolean>();
  public change(change: boolean): void {
    this.buttonClick.emit(change);
  }

  constructor(private service:ServicesService) { }
  serviceDescription:ServiceDescription[]=[]
  ngOnInit(): void {
    this.service.getAllDescriptionService().subscribe(value => {
      this.serviceDescription=value
    })
  }
  showDiv(cl:string){
    document.getElementsByClassName("general");
    for (let res of document.getElementsByClassName("general")){
     res.setAttribute('style','display:none')
    }
    document.getElementsByClassName(cl)[0].setAttribute('style','display:block');
  }


}
