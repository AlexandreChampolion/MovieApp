import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallApiProvider } from '../../providers/api-connection/api-connection';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
})
export class MovieDetailsPage {

  selectedItem: any;
  public data: any;
  detailData: any;
  isFavorite: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public callApiProvider: CallApiProvider, 
    public navParams: NavParams, 
    public favoriteProvider: FavoriteProvider) {
    
    this.favoriteProvider.isFavorite(this.navParams.get('item').imdbID).then( favoriteResult =>
      this.isFavorite = favoriteResult
      );
    this.callApiProvider.searchItemById(this.navParams.get('item').imdbID).subscribe((movie) => {
      this.selectedItem = movie;
    })
  }

  favorite(idMovie) {
    this.isFavorite = !this.isFavorite;
    this.favoriteProvider.favorite(idMovie);
  }

  downloadPoster(){
    this.callApiProvider.getAndWritePoster(this.navParams.get('item').imdbID);
    this.callApiProvider.showAlertDownload();
  }

}
