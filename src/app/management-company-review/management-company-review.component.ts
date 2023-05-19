import { Component, OnInit } from '@angular/core';
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ManagementCompany} from "../modules/management-company";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-management-company-review',
  templateUrl: './management-company-review.component.html',
  styleUrls: ['./management-company-review.component.css']
})
export class ManagementCompanyReviewComponent implements OnInit {

  constructor(private managementService:ManagementCompaniesService,
              private route:ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.idStatus = paramMap.get('idStatus');
      this.ngOnInit();
    });
  }
  managementCompanies:ManagementCompany[]=[];
  idStatus:number=0;

  ngOnInit(): void {
    this.idStatus=Number(this.route.snapshot.params["idStatus"]);

    this.managementService.getMCForStatus(this.idStatus).subscribe(value => {
      this.managementCompanies=value;
    })

  }

}
