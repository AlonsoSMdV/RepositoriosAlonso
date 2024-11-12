import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/core/services/impl/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router,
    /*private authSvc: AuthService*/) { }

  ngOnInit() {
  }

  Login(){
    this.router.navigate(['/login']);
  }
  

  Home(){
    this.router.navigate(['/home']);
  }
  
  onSubmit(formData:any){
    throw new Error("Method not implemented.");
  }

}
