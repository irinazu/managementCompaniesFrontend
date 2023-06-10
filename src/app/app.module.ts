import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AngularYandexMapsModule, YaConfig} from "angular8-yandex-maps";
import { MainPageComponent } from './main-page/main-page.component';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RequestInterceptor } from './request.interceptor';
import { PrivateOfficeComponent } from './private-office/private-office.component';
import { RequestsComponent } from './requests/requests.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { CertainRequestComponent } from './certain-request/certain-request.component';
import { ListOfServicesComponent } from './list-of-services/list-of-services.component';
import { MenuForServiceComponent } from './menu-for-service/menu-for-service.component';
import { NewDataCounterComponent } from './new-data-counter/new-data-counter.component';
import { StatisticsForServiceComponent } from './statistics-for-service/statistics-for-service.component';
import { HistoryOfServiceComponent } from './history-of-service/history-of-service.component';
import { DebtsComponent } from './debts/debts.component';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';
import { PaymentsComponent } from './payments/payments.component';
import { NewVoteComponent } from './new-vote/new-vote.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import {EditorComponent, EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import { AllNewsComponent } from './all-news/all-news.component';
import { CertainNewsComponent } from './certain-news/certain-news.component';
import {NgxPermissionsModule} from "ngx-permissions";
import { MenuForRequestComponent } from './menu-for-request/menu-for-request.component';
import { HousesRequestsComponent } from './houses-requests/houses-requests.component';
import { UsersForHouseComponent } from './users-for-house/users-for-house.component';
import { MenuForNewsComponent } from './menu-for-news/menu-for-news.component';
import { NewsRedactionComponent } from './news-redaction/news-redaction.component';
import { CreateVotingComponent } from './create-voting/create-voting.component';
import { MenuForVotingComponent } from './menu-for-voting/menu-for-voting.component';
import { VotingReductionComponent } from './voting-reduction/voting-reduction.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ManagementCompaniesComponent } from './management-companies/management-companies.component';
import { ManagementCompanyInfoComponent } from './management-company-info/management-company-info.component';
import { ManagementCompaniesForHeadComponent } from './management-companies-for-head/management-companies-for-head.component';
import { WorkersComponent } from './workers/workers.component';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { AddHouseComponent } from './add-house/add-house.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { ManagementCompanyRequisitesComponent } from './management-company-requisites/management-company-requisites.component';
import { ManagementCompanyReviewComponent } from './management-company-review/management-company-review.component';
import { MenuForManagementCompanyComponent } from './menu-for-management-company/menu-for-management-company.component';
import { InfoForHeadManagementCompanyComponent } from './info-for-head-management-company/info-for-head-management-company.component';
import { AddHeadComponent } from './add-head/add-head.component';
import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { AddManagementCompanyComponent } from './add-management-company/add-management-company.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ReportComponent } from './report/report.component';
import { AllChatComponent } from './all-chat/all-chat.component';
import { CertainChatComponentComponent } from './certain-chat-component/certain-chat-component.component';
import { PopupChatComponent } from './popup-chat/popup-chat.component';
import { PopupDeleteConfirmComponent } from './popup-delete-confirm/popup-delete-confirm.component';
import { PopupMaxSizeComponent } from './popup-max-size/popup-max-size.component';
import {MatDialogModule} from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeteringDevicesComponent } from './metering-devices/metering-devices.component';
import { AddMeteringDeviceComponent } from './add-metering-device/add-metering-device.component';
import {MapService} from "./services/map.service";
import { CertainVoteComponent } from './certain-vote/certain-vote.component';

const mapConfig: YaConfig = {
  apikey: 'ea14d089-f726-44f0-a43c-6edd2b1f636c',
  lang: 'en_US',
};
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MapComponent,
    LoginComponent,
    PrivateOfficeComponent,
    RequestsComponent,
    CreateRequestComponent,
    CertainRequestComponent,
    ListOfServicesComponent,
    MenuForServiceComponent,
    NewDataCounterComponent,
    StatisticsForServiceComponent,
    HistoryOfServiceComponent,
    DebtsComponent,
    GeneralStatisticsComponent,
    PaymentsComponent,
    NewVoteComponent,
    CreateNewsComponent,
    AllNewsComponent,
    CertainNewsComponent,
    MenuForRequestComponent,
    HousesRequestsComponent,
    UsersForHouseComponent,
    MenuForNewsComponent,
    NewsRedactionComponent,
    CreateVotingComponent,
    MenuForVotingComponent,
    VotingReductionComponent,
    MainMenuComponent,
    ManagementCompaniesComponent,
    ManagementCompanyInfoComponent,
    ManagementCompaniesForHeadComponent,
    WorkersComponent,
    AddWorkerComponent,
    AddHouseComponent,
    PersonalAccountComponent,
    ManagementCompanyRequisitesComponent,
    ManagementCompanyReviewComponent,
    MenuForManagementCompanyComponent,
    InfoForHeadManagementCompanyComponent,
    AddHeadComponent,
    RegistrationUserComponent,
    AddManagementCompanyComponent,
    AddUserComponent,
    ReportComponent,
    AllChatComponent,
    CertainChatComponentComponent,
    PopupChatComponent,
    PopupDeleteConfirmComponent,
    PopupMaxSizeComponent,
    MeteringDevicesComponent,
    AddMeteringDeviceComponent,
    CertainVoteComponent,
  ],
    imports: [
        BrowserModule,
        AngularYandexMapsModule,
        AngularYandexMapsModule.forRoot(mapConfig),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        MatDialogModule,
        NgxPermissionsModule.forRoot(),
        BrowserAnimationsModule
    ],
  providers: [/*{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },*/MapService],
  bootstrap: [AppComponent]
})
export class AppModule {}
