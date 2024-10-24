import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons/buttons.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ButtonsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [ButtonsComponent]
})
export class SharedModule { }
