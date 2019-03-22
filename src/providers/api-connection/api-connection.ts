import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { File } from "@ionic-native/file";
import { AlertController } from 'ionic-angular';


/*
  Generated class for the PageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallApiProvider {

  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  url;
  private poster_url: string = "http://img.omdbapi.com/?apikey=551f90f9";

  constructor(public http: HttpClient, public file: File, private androidPermissions: AndroidPermissions, public alertCtrl: AlertController) {

  }

  getListItems() {
    return this.items;
  }

  load(movieTitle) {
    return this.http.get('http://www.omdbapi.com/?s=' + movieTitle + '&apikey=551f90f9' + '&Type=movie').pipe(
      map(results => results['Search'])
    );
  }

  loadSerie(serieTitle) {
    return this.http.get('http://www.omdbapi.com/?s=' + serieTitle + '&apikey=551f90f9' + '&Type=series').pipe(
      map(results => results['Search'])
    );
  }

  searchItemById(imdbID) {
    this.url = 'http://www.omdbapi.com/?apikey=551f90f9&i=' + imdbID + '&plot=full';
    return this.http.get(this.url).pipe(
      map(results => {
        return results
      })
    );
  }

  searchMovies(imdbID) {
    this.url = 'http://www.omdbapi.com/?apikey=551f90f9&i=' + imdbID;
    return this.http.get(this.url).pipe(
      map(results => {
        return results
      })
    );
  }

  getSeasonDetail(idSerie,seasonIndex) {
    this.url = 'http://www.omdbapi.com/?apikey=551f90f9&i='+idSerie+'&Season='+seasonIndex;
    return this.http.get(this.url).pipe(
      
    );    

  }

  getEpisodeDetail(idEpisode) {
    this.url = 'http://www.omdbapi.com/?apikey=551f90f9&i='+idEpisode;
    return this.http.get(this.url).pipe(
      map(results => {
        return results
      })
    );    

  }

  getAndWritePoster(movie_id: string) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.http.get(this.poster_url + "&i=" + movie_id + "&h=2048", {responseType: 'arraybuffer'}).toPromise()
            .then(data => {
              return this.file.writeFile(
                this.file.externalRootDirectory + "/Download/",
                movie_id + ".jpeg",
                data,
                {replace: true}
              );
            }).catch(err=>console.log(err));
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if (status.hasPermission) {
                this.http.get(this.poster_url + "&i=" + movie_id + "&h=2048", {responseType: 'arraybuffer'}).toPromise()
                  .then(data => {
                    return this.file.writeFile(
                      this.file.externalRootDirectory + "/Download/",
                      movie_id + ".jpeg",
                      data,
                      {replace: true}
                    );
                  }).catch(err=>console.log(err));
              }
            });
        }
      });
  }

  showAlertDownload() {
    const alert = this.alertCtrl.create({
      title: 'Image téléchargé dans votre dossier Download !',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }
}
