import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons/buttons.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  declarations: [ButtonsComponent, RegisterFormComponent, LoginFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [ButtonsComponent]
})
export class SharedModule { }
