import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerieDetailsPage } from './serie-details';

@NgModule({
  declarations: [
    SerieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SerieDetailsPage),
  ],
})
export class SerieDetailsPageModule {}
