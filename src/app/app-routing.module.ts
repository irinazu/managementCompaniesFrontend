import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {MapComponent} from "./map/map.component";
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
import {NewVoteComponent} from "./new-vote/new-vote.component";
import {CreateNewsComponent} from "./create-news/create-news.component";
import {AllNewsComponent} from "./all-news/all-news.component";
import {CertainNewsComponent} from "./certain-news/certain-news.component";
import {MenuForRequestComponent} from "./menu-for-request/menu-for-request.component";
import {HousesRequestsComponent} from "./houses-requests/houses-requests.component";
import {UsersForHouseComponent} from "./users-for-house/users-for-house.component";
import {MenuForNewsComponent} from "./menu-for-news/menu-for-news.component";
import {NewsRedactionComponent} from "./news-redaction/news-redaction.component";
import {CreateVotingComponent} from "./create-voting/create-voting.component";
import {MenuForVotingComponent} from "./menu-for-voting/menu-for-voting.component";
import {VotingReductionComponent} from "./voting-reduction/voting-reduction.component";
import {ManagementCompaniesComponent} from "./management-companies/management-companies.component";
import {ManagementCompanyInfoComponent} from "./management-company-info/management-company-info.component";
import {ManagementCompaniesForHeadComponent} from "./management-companies-for-head/management-companies-for-head.component";
import {WorkersComponent} from "./workers/workers.component";
import {AddWorkerComponent} from "./add-worker/add-worker.component";
import {AddHouseComponent} from "./add-house/add-house.component";
import {PersonalAccountComponent} from "./personal-account/personal-account.component";
import {ManagementCompanyRequisitesComponent} from "./management-company-requisites/management-company-requisites.component";
import {ManagementCompanyReviewComponent} from "./management-company-review/management-company-review.component";
import {MenuForManagementCompanyComponent} from "./menu-for-management-company/menu-for-management-company.component";
import {InfoForHeadManagementCompanyComponent} from "./info-for-head-management-company/info-for-head-management-company.component";
import {AddHeadComponent} from "./add-head/add-head.component";
import {AddManagementCompanyComponent} from "./add-management-company/add-management-company.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {RegistrationUserComponent} from "./registration-user/registration-user.component";
import {ReportComponent} from "./report/report.component";
import {AllChatComponent} from "./all-chat/all-chat.component";
import {CertainChatComponentComponent} from "./certain-chat-component/certain-chat-component.component";
import {MeteringDevicesComponent} from "./metering-devices/metering-devices.component";
import {AddMeteringDeviceComponent} from "./add-metering-device/add-metering-device.component";

const routes: Routes = [
  {path: '',component:MainPageComponent},
  {path: 'login', component: LoginComponent },
  {path: 'registrationUser', component: RegistrationUserComponent },
  {path: 'managementCompanies', component: ManagementCompaniesComponent },
  {path: 'managementCompanies/certainManagementCompany/:idMC', component: ManagementCompanyInfoComponent },

  {path: 'infoForManagementCompany', component: InfoForHeadManagementCompanyComponent },
  {path: 'infoForManagementCompany/addHead', component: AddHeadComponent },

  {path: 'map',component:MapComponent},

  {
    path: 'privateOffice', component:PrivateOfficeComponent, children: [

      {path: 'menuRequests',component:MenuForRequestComponent,children:
          [
            {path: 'requests/:mode',component:RequestsComponent},
            {path: 'requests/:mode/createRequest',component:CreateRequestComponent},
            {path: 'requests/:mode/requestHistory/:id',component: CertainRequestComponent},
          ]
      },

      {path: 'allChat',component: AllChatComponent},
      {path: 'allChat/certainChat/:id/:title',component: CertainChatComponentComponent},

      {path: 'addUser',component: AddUserComponent},

      {path: 'managementCompaniesReview/:idStatus',component: ManagementCompanyReviewComponent},

      {path: 'addManagementCompany',component: AddManagementCompanyComponent},

      {path: 'menuForManagementCompanyComponent',component:MenuForManagementCompanyComponent,children:
          [
            {path: 'managementCompaniesReview/:idStatus',component: ManagementCompanyReviewComponent},
            {path: 'managementCompaniesReview/:idStatus/requisitesManagementCompany/:idMC',component: ManagementCompanyRequisitesComponent},
          ]
      },

      {path: 'managementCompaniesForHead',component: ManagementCompaniesForHeadComponent},

      {path: 'managementCompaniesForHead/requisitesManagementCompany/:idMC',component:ManagementCompanyRequisitesComponent},

      {path: 'managementCompaniesForHead/workers/:idMC',component: WorkersComponent},
      {path: 'managementCompaniesForHead/workers/:idMC/addWorker/:idMC/:idWorker',component: AddWorkerComponent},

      {path: 'managementCompaniesForHead/housesRequests/:idMC',component: HousesRequestsComponent},
      {path: 'managementCompaniesForHead/housesRequests/:idMC/addHouse/:idMC/:idHouse',component: AddHouseComponent},

      {path: 'housesRequests/:idMC',component: HousesRequestsComponent},
      {path: 'housesRequests/:idMC/usersForHouse/:houseId',component: UsersForHouseComponent},
      {path: 'housesRequests/:idMC/usersForHouse/:houseId/meteringDevices/:userId',component: MeteringDevicesComponent},
      {path: 'housesRequests/:idMC/usersForHouse/:houseId/meteringDevices/:userId/addMeteringDevices/:meteringDevicesIdType/:idMeteringDevice',component: AddMeteringDeviceComponent},
      {path: 'housesRequests/:idMC/report/:houseId/:modeReport',component: ReportComponent},

      {path: 'privateAccount',component: PersonalAccountComponent},

      {path: 'menuNews',component:MenuForNewsComponent,children:
          [
            {path: 'allNews/:mode',component: AllNewsComponent},
            {path: 'allNews/:mode/createNews',component: CreateNewsComponent},
            {path: 'allNews/:mode/reductionNews/:id',component: NewsRedactionComponent},
            {path: 'allNews/:mode/certainNews/:id',component: CertainNewsComponent},
            {path: 'allNews/:mode/certainNews/:id/reductionNews/:id',component: NewsRedactionComponent},

          ]
      },

      {path: 'menuVoting',component: MenuForVotingComponent,children:
          [
            {path: 'vote/:mode',component: NewVoteComponent},
            {path: 'vote/:mode/createVoting',component:CreateVotingComponent},
            {path: 'vote/:mode/updateVoting/:voteId',component:VotingReductionComponent},

          ]
      },


      {path: 'createNews',component: CreateNewsComponent},
      {path: 'allNews/:mode',component: AllNewsComponent},
      {path: 'allNews/:mode/certainNews/:id',component: CertainNewsComponent},

      {path: 'managementCompaniesForHead/allNews/:mode',component: AllNewsComponent},
      {path: 'managementCompaniesForHead/allNews/:mode/certainNews/:id',component: CertainNewsComponent},

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
