import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallApiProvider } from '../../providers/api-connection/api-connection';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Injectable()
export class FavoriteProvider {

  selectedItem: any;
  public data: any;
  detailData: any;
  favoriteList = [];

  constructor(public http: HttpClient,  public callApiProvider: CallApiProvider, private storage: Storage, public alertCtrl: AlertController) {
    
  }

  isFavorite(imdbID) {
    return this.storage.get('Favorite').then((state) => {
      if (state !== null) {
        if (state.indexOf(imdbID) === -1){
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    });
  }

  favorite(idMovie) {
    this.isFavorite(idMovie).then( result => {
      if (!result) {
        this.addToFavorite(idMovie);
      }
      else {
        this.deleteFavorite(idMovie);
      }
    })
  }

  addToFavorite(idMovie) {
    this.storage.get('Favorite').then((state) => {
      if (state) {
        this.favoriteList = state;
      }
      else {
        this.favoriteList = [];
      }
      
      if (this.favoriteList.indexOf(idMovie) === -1) {
        this.favoriteList.push(idMovie);
      }
      this.storage.set('Favorite', this.favoriteList);
    });
    this.showAlertAdd();
  }

  deleteFavorite(idMovie) {

    this.storage.get('Favorite').then((state) => {
      if (state !== null) {
        this.favoriteList = state;
      }
      else {
        this.favoriteList = [];
      }

      this.favoriteList.splice( this.favoriteList.indexOf(idMovie), 1 );
      this.storage.set('Favorite', this.favoriteList);
      this.showAlertDel();
    });
  }

  showAlertAdd() {
    const alert = this.alertCtrl.create({
      title: 'Ajouté au Favoris!',
      subTitle: 'Consulté vos Favoris dans le menu !',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertDel() {
    const alert = this.alertCtrl.create({
      title: 'Supprimé des Favoris!',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }

}
