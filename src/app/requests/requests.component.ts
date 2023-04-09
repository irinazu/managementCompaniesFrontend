import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {Request} from "../modules/request";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests:Request[]=[];
  constructor(private requestService:RequestService ) { }

  ngOnInit(): void {
    this.requestService.getRequestForUser().subscribe(value => {
      this.requests=value;
      console.log(this.requests);
    })
  }

}
