import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {MapComponent} from "./map/map.component";
import {JokerComponent} from "./joker/joker.component";
import {AuthenticationGuard} from "./authentication.guard";
import {LoginComponent} from "./login/login.component";
import {PrivateOfficeComponent} from "./private-office/private-office.component";
import {RequestsComponent} from "./requests/requests.component";
import {CreateRequestComponent} from "./create-request/create-request.component";
import {CertainRequestComponent} from "./certain-request/certain-request.component";
import * as path from "path";
import {ListOfServicesComponent} from "./list-of-services/list-of-services.component";
import {MenuForServiceComponent} from "./menu-for-service/menu-for-service.component";
import {NewDataCounterComponent} from "./new-data-counter/new-data-counter.component";
import {StatisticsForServiceComponent} from "./statistics-for-service/statistics-for-service.component";
import {HistoryOfServiceComponent} from "./history-of-service/history-of-service.component";
import {DebtsComponent} from "./debts/debts.component";
import {GeneralStatisticsComponent} from "./general-statistics/general-statistics.component";
import {PaymentsComponent} from "./payments/payments.component";
import {ChatComponent} from "./chat/chat.component";
import {NewVoteComponent} from "./new-vote/new-vote.component";
import {CreateNewsComponent} from "./create-news/create-news.component";

const routes: Routes = [
  //{path: '',component:MainPageComponent},
  {path: 'map',component:MapComponent},
  {
    path: 'privateOffice',
    component:PrivateOfficeComponent,
    children: [
      {path: 'requests',component:RequestsComponent},
      {path: 'requests/createRequest',component:CreateRequestComponent},
      {path: 'requests/requestHistory/:id',component: CertainRequestComponent},
      {path: 'chat',component: ChatComponent},
      {path: 'vote',component: NewVoteComponent},
      {path: 'createNews',component: CreateNewsComponent},

      {path: 'listOfService',component:ListOfServicesComponent,children:[
          {path:'serviceMenuCounter/:id',component:MenuForServiceComponent, children:[
              {path:'newDataCounter/:id',component:NewDataCounterComponent},
              {path:'statisticsService/:id',component:StatisticsForServiceComponent},
              {path:'historyOfService/:id',component:HistoryOfServiceComponent},
              {path:'debtsOfCertainService/:id',component:DebtsComponent}
            ]},
          {path:'generalStatistics',component:GeneralStatisticsComponent},
          {path:'payments',component:PaymentsComponent},
        ]}

    ]
  },


  {path: '', canActivate:[AuthenticationGuard], children: [
      { path: '', component: JokerComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
