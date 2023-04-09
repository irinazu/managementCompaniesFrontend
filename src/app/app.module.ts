import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AngularYandexMapsModule, YaConfig} from "angular8-yandex-maps";
import { MainPageComponent } from './main-page/main-page.component';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JokerComponent } from './joker/joker.component';
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
import { ChatComponent } from './chat/chat.component';
import { NewVoteComponent } from './new-vote/new-vote.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import {EditorComponent, EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";

const mapConfig: YaConfig = {
  apikey: 'ea14d089-f726-44f0-a43c-6edd2b1f636c',
  lang: 'en_US',
};
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MapComponent,
    JokerComponent,
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
    ChatComponent,
    NewVoteComponent,
    CreateNewsComponent,
  ],
    imports: [
        BrowserModule,
        AngularYandexMapsModule,
        AngularYandexMapsModule.forRoot(mapConfig),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule
    ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
