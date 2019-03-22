import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { Movie } from '../pages/home/home';
import { MovieDetailsPage } from '../pages/movie-details/movie-details';
import { Serie } from '../pages/serie/serie';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallApiProvider } from '../providers/api-connection/api-connection';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { HttpClientModule } from '@angular/common/http';
import { TabsPage } from '../pages/tabs/tabs';
import { FavoritePage } from '../pages/favorite/favorite';
import { SerieDetailsPage } from '../pages/serie-details/serie-details';
import { EpisodeDetailsPage } from '../pages/episode-details/episode-details';
import { SeasonDetailsPage } from '../pages/season-details/season-details';
import { ImportExportProvider } from '../providers/importExport/import-export';
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { File } from '@ionic-native/file';
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FavoritePage,
    Movie,
    MovieDetailsPage,
    Serie, 
    SerieDetailsPage,
    SeasonDetailsPage,
    EpisodeDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    FavoritePage,
    Movie,
    MovieDetailsPage,
    Serie,
    SerieDetailsPage,
    SeasonDetailsPage,
    EpisodeDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallApiProvider,
    FavoriteProvider,
    ImportExportProvider,
    File,
    FileChooser,
    ImportExportProvider,
    AndroidPermissions,
    FilePath
  ]
})
export class AppModule {}
