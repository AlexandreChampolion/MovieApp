import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { CallApiProvider } from '../../providers/api-connection/api-connection';
import { MovieDetailsPage } from '../movie-details/movie-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CallApiProvider]
})

export class Movie {

  public data: any;
  public position: any;
  searchTerm : any="";
  toggled: boolean;
  private Movie;
  private MoviePage = this.MoviePage;
  private Favorite;
  noResult = true;

  constructor(public navCtrl: NavController, public callApiProvider: CallApiProvider, public alertCtrl: AlertController){
    this.toggled = false;
    this.Movie = Movie;
    this.Favorite = this.Favorite;
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }

  itemTapped(event, item){
    this.navCtrl.push(MovieDetailsPage, {
      item: item
    });
  }

  initializeItems() {
    this.callApiProvider.load(this.searchTerm).subscribe(result => {
      
      if (!result || result['Response'] === 'False') {
        this.noResult = false;
      }
      else {
        this.noResult = true;
      }
      this.data = result;
    })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.data = this.data.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
