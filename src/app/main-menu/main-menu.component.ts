import { Component, OnInit } from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private permissionsService: NgxPermissionsService,  private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.clear();
    this.permissionsService.flushPermissions();
    setTimeout(() => {
      this.router.navigate(['']);
    });

  }

  allMC() {
    this.router.navigate(['managementCompanies']);
  }

  profileUser() {
    if(localStorage.getItem("role")=="HEAD"||localStorage.getItem("role")=="ADMIN"){
      this.router.navigate(['privateOffice','managementCompaniesForHead']);
    }else if(localStorage.getItem("role")=="ACCOUNTANT"){
      this.router.navigate(['privateOffice','housesRequests',-1]);
    }
    else {
      this.router.navigate(['privateOffice','menuNews','allNews','all']);
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  infoForManagementCompany() {
    this.router.navigate(['infoForManagementCompany']);
  }

  registration() {
    this.router.navigate(['registrationUser']);
  }
}
