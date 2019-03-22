import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeasonDetailsPage } from './season-details';

@NgModule({
  declarations: [
    SeasonDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SeasonDetailsPage),
  ],
})
export class SeasonDetailsPageModule {}
