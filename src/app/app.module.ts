import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { DatabaseProvider } from '../providers/database/database';
import {IonicStorageModule} from "@ionic/storage";
import {HttpModule} from "@angular/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {SQLite} from "@ionic-native/sqlite";
// import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {HttpClientModule} from "@angular/common/http";
import {AddEventPageModule} from "../pages/add-event/add-event.module";
import {DetallesPageModule} from "../pages/detalles/detalles.module";
import {TabPageModule} from "../pages/tab/tab.module";
import {SearchPageModule} from "../pages/search/search.module";

// import {EmailComposer} from "@ionic-native/email-composer";
// import {DatePicker} from "@ionic-native/date-picker";
// import { File } from '@ionic-native/file'; //para importar y exporatar bd
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import {UniqueDeviceID} from "@ionic-native/unique-device-id";
// import {Device} from "@ionic-native/device";

// import { InViewportModule, WindowRef} from "@thisissoon/angular-inviewport";
import { InformacionGeneralProvider } from '../providers/informacionGeneral/informacionGeneral';
import { EvaluacionCulturalProvider } from '../providers/evaluacionCultural/evaluacionCultural';
import { EstadoTecnicoConstructivoProvider } from '../providers/estadoTecnicoConstructivo/estadoTecnicoConstructivo';
// const providers = [
//   { provide: WindowRef, useValue: window }
// ];

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AddEventPageModule,
    DetallesPageModule,
    TabPageModule,
    // ProfilePageModule,
    SearchPageModule,
    // InViewportModule.forRoot(),
    // InViewportModule.forRoot(providers)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLite,
    SQLitePorter,
    InformacionGeneralProvider,
    EvaluacionCulturalProvider,
    EstadoTecnicoConstructivoProvider,
    


  ]

})
export class AppModule {}
