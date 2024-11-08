import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {
  formGroup: FormGroup
  mode: string | undefined;
genders: any;
  constructor(private fb: FormBuilder,
              private modalCtrl:ModalController
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname:['', [Validators.required, Validators.minLength(2)]],
      username:['', Validators.required, Validators.minLength(2)],
      gender:['', [Validators.required]],
      birthdate:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]

    });
   }

   get name(){
    return this.formGroup.controls['name'];
  }

  get surname(){
    return this.formGroup.controls['surname'];
  }

  get birthdate(){
    return this.formGroup.controls['birthdate'];
  }

  get email(){
    return this.formGroup.controls['email'];
  }

  get gender(){
    return this.formGroup.controls['gender'];
  }

  get username(){
    return this.formGroup.controls['username'];
  }

  get password(){
    return this.formGroup.controls['password'];
  }
  
  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues: any = {};
  
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        dirtyValues[key] = control.value;
      }
    });
  
    return dirtyValues;
  }
  
  
  onSubmit(){
    if (this.formGroup.valid) {
      this.modalCtrl.dismiss(
          (this.mode=='new'?
            this.formGroup.value:
            this.getDirtyValues(this.formGroup)), this.mode
      );
    } else {
      console.log('Formulario inválido');
    }

  }
  
  ngOnInit() {}

}
