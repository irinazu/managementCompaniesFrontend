import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {UserSystem} from "../modules/user-system";
import {UserSystemService} from "../services/user-system.service";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  sessionId: any = "";

  errorLogin:string="";
  errorPassword:string="";
  errorExist:string="";

  flagCheck:boolean=true;
  userSystem:UserSystem=new UserSystem();

  constructor(
    private userService:UserSystemService,
    private ngxService:NgxPermissionsService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  /*login() {
    let url = 'http://localhost:8080/api/login';
    this.http.post<any>(url, {
      username: this.model.username,
      password: this.model.password
    }).subscribe(res => {
      if (res) {
        this.sessionId = res.sessionId;

        sessionStorage.setItem(
          'token',
          this.sessionId
        );
        this.router.navigate(['']);
      } else {
        alert("Authentication failed.")
      }
    });
  }*/

  loginOnServer() {
    this.errorLogin="";
    this.errorPassword="";
    this.errorExist="";
    this.flagCheck=true;

    if(this.userSystem.email.length==0){
      this.errorLogin="Введите Логин";
      this.flagCheck=false;
    }
    if(this.userSystem.password.length==0){
      this.errorPassword="Введите Пароль";
      this.flagCheck=false;
    }
    if(this.flagCheck){
      this.userService.login(this.userSystem).subscribe(value => {
        this.userSystem=value;
        if(value==null){
          this.errorExist="Пользователя не существует";
        }else if(this.userSystem.errorLogin!=null){
          this.errorLogin="Логина не существует";
        }else if(this.userSystem.errorPassword!=null){
          this.errorLogin="Неправильный пароль";
        }else {
          localStorage.setItem("id",this.userSystem.id.toString());
          localStorage.setItem("role",this.userSystem.roleDTO.title);
          this.ngxService.flushPermissions();
          this.ngxService.addPermission(this.userSystem.roleDTO.title);

          setTimeout(() => {
            this.router.navigate(['']);
          });
        }
      })
    }
  }


}
