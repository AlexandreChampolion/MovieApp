import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallApiProvider } from '../../providers/api-connection/api-connection';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { ImportExportProvider } from '../../providers/importExport/import-export';
import { MovieDetailsPage } from '../movie-details/movie-details';

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  favoriteId = [];
  favoriteMovies = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public CallApiProvider: CallApiProvider,
    public favoriteProvider: FavoriteProvider,
    private file: ImportExportProvider,
    public ImportExportProvider: ImportExportProvider,
    public alertController: AlertController) {
  }

  ionViewWillEnter() {
    this.setFavorites();
  }

  ionViewDidEnter() {
    this.storage.get('Favorite').then((state) => {
      console.log("state", state);
      if (state) {
        this.favoriteId = state;
        this.favoriteMovies = [];
        console.log(this.favoriteId);
        this.favoriteId.forEach((element) => {
          console.log(element);
          this.CallApiProvider.searchMovies(element).subscribe(data => {
            console.log(this.favoriteMovies);
            this.favoriteMovies.push(data);
          });
        });
      }
    });
  }

  setFavorites() {
    this.favoriteMovies = [];
    this.storage.get('Favorite')
      .then(state => {
        for (let key of state) {
          this.favoriteMovies.push(key);
        }
      }).catch(err => {
        console.log(err);
      })
  }

  deleteFavorite(idMovie) {
    this.favoriteProvider.deleteFavorite(idMovie);
    this.favoriteMovies.splice(this.favoriteMovies.indexOf(idMovie), 1);
  }

  itemTapped(favorite) {
    this.navCtrl.push(MovieDetailsPage, {
      item: favorite,
      detail: favorite,
    });
  }

  async presentAlertConfirm() {
    let alert = await this.alertController.create({
      title: 'Exporter vos favoris',
      message: 'Choisissez votre type d\'export',
      buttons: [
        {
          text: 'JSON',
          handler: () => {
          }
        }, {
          text: 'CSV',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  async importFavorites() {
    let alert = await this.alertController.create({
      title: 'Confirmation d\'import',
      message: 'Voulez vous vraiment importer ce fichier ? ' +
        'Tous vos favoris actuel vont être remis à zéro.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Importer',
          handler: () => {
            this.file.getFileAndImport();
          }
        }
      ]
    });
    await alert.present().then(() => this.setFavorites()).catch();
  }
  
}
