import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';


/**
 * Generated class for the EpisodeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode-details',
  templateUrl: 'episode-details.html',
})
export class EpisodeDetailsPage {

  episodeDetail : any;
  episodeIndex : any;
  isFavorite: boolean = false;

  constructor(public favoriteProvider: FavoriteProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.episodeDetail = navParams.get('episodeDetail');
    this.episodeIndex= navParams.get('episodeIndex');
  }

  favorite(idSerie) {
    this.isFavorite = !this.isFavorite;
    this.favoriteProvider.favorite(idSerie);
  }

}
