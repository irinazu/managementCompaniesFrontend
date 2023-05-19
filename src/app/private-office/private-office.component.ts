import { Component, OnInit } from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-private-office',
  templateUrl: './private-office.component.html',
  styleUrls: ['./private-office.component.css']
})
export class PrivateOfficeComponent implements OnInit {

  constructor(private ngxPermissionsService:NgxPermissionsService) { }

  permissionRole:string="GUEST";

  ngOnInit(): void {
    this.permissionRole=localStorage.getItem('role')!;
    this.ngxPermissionsService.loadPermissions([this.permissionRole]);
  }

}
