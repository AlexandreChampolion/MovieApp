import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Serie } from './serie';

@NgModule({
  declarations: [
    Serie,
  ],
  imports: [
    IonicPageModule.forChild(Serie),
  ],
})
export class SeriePageModule {}
