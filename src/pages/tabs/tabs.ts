import { FavoritePage } from './../favorite/favorite';
import { Component } from '@angular/core';
import { Movie } from '../home/home';
import { Serie } from '../serie/serie';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabMovie = Movie;
  tabSerie = Serie;
  tabFavorite = FavoritePage;
  alreadyPassed: Boolean = false;

  constructor(private storage: Storage, public alertCtrl: AlertController) {

  }
 
  ionViewWillEnter() {
    this.storage.get('alreadyPassed').then((alreadyPassed) => {
       if(!alreadyPassed) {
         this.storage.set('alreadyPassed', true);
         this.showTuto();
       }
    });
  }

  showTuto() {
    const alert = this.alertCtrl.create({
      title: 'Tutoriel',
      cssClass: 'tuto',
      message: '<img src="assets/imgs/tuto.png" alt="">',
      buttons: ['Compris']
    });
    alert.present();
  }

}
