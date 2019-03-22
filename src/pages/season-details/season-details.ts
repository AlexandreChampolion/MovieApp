import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApiProvider } from '../../providers/api-connection/api-connection';
import { EpisodeDetailsPage } from '../episode-details/episode-details';

/**
 * Generated class for the SeasonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-saison',
  templateUrl: 'season-details.html',
})
export class SeasonDetailsPage {
  
  selectedItem;
  seasonDetail;
  seasonIndex;
  dataDetail;
  episodes: Array<Number> = [];
  idSerie: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callApiProvider: CallApiProvider) {

    this.idSerie = navParams.get('id');
    this.seasonIndex = navParams.get('seasonIndex');

    callApiProvider.getSeasonDetail(this.idSerie, this.seasonIndex).subscribe(data => {
      this.episodes = data['Episodes'];
    });
  }
  
  episodeTapped(idEpisode,episodeIndex){
    this.callApiProvider.getEpisodeDetail(idEpisode).subscribe(data => {
      this.navCtrl.push(EpisodeDetailsPage, {
        episodeDetail : data,
        episodeIndex : episodeIndex,
      });
    });
  }
}