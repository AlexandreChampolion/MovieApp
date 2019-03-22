import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApiProvider } from '../../providers/api-connection/api-connection';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { SeasonDetailsPage } from '../season-details/season-details';

/**
 * Generated class for the SerieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serie-details',
  templateUrl: 'serie-details.html',
})
export class SerieDetailsPage {

  selectedItem: any;
  public data: any;
  detailData: any;
  seasons: Array<Number> = [];
  seasonIndex: any;
  idSerie: any;
  isFavorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callApiProvider: CallApiProvider, public favoriteProvider: FavoriteProvider) {

    this.selectedItem = navParams.get('item');

    this.callApiProvider.searchItemById(this.navParams.get('item').imdbID).subscribe((movie) => {
      this.selectedItem = movie;
      this.seasons = Array(parseInt(movie['totalSeasons']));
    })
  }

  favorite(idSerie) {
    this.isFavorite = !this.isFavorite;
    this.favoriteProvider.favorite(idSerie);
  }

  seasonTapped(idSerie, seasonIndex) {
    this.seasonIndex = seasonIndex + 1;

      this.navCtrl.push(SeasonDetailsPage, {
        id: idSerie,
        seasonIndex: this.seasonIndex,
      });
  }

}
