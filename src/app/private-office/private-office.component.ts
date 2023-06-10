import { Component, OnInit } from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-private-office',
  templateUrl: './private-office.component.html',
  styleUrls: ['./private-office.component.css']
})
export class PrivateOfficeComponent implements OnInit {

  constructor(private ngxPermissionsService:NgxPermissionsService,private router:Router) { }

  permissionRole:string="GUEST";

  ngOnInit(): void {
    this.permissionRole=localStorage.getItem('role')!;
    this.ngxPermissionsService.loadPermissions([this.permissionRole]);
  }

  goToRequests() {
    localStorage.setItem('modeRequests','forMC');
    localStorage.setItem('modeRequestsIdUser','0');
    this.router.navigate(['privateOffice','menuRequests','requests','true']);
  }
}
