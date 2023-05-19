import { Component, OnInit } from '@angular/core';
import {UserSystem} from "../modules/user-system";
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ActivatedRoute} from "@angular/router";
import {ManagementCompany} from "../modules/management-company";

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  constructor(private managementCompanyService:ManagementCompaniesService,
              private router:ActivatedRoute) { }
  workers:UserSystem[]=[];
  mc:ManagementCompany=new ManagementCompany();

  idMC:number=-1;

  ngOnInit(): void {
    this.idMC=this.router.snapshot.params['idMC'];

    //УК
    this.managementCompanyService.getCertainMC(this.idMC).subscribe(value => {
      this.mc=value
    })

    //все работники
    this.managementCompanyService.getAllWorkersForMC(this.idMC).subscribe(value => {
      this.workers=value
    })
  }

}
