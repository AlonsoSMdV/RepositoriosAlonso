import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/core/services/impl/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private router: Router,
    /*private authSvc: AuthService*/) { }

  ngOnInit() {
  }

    Home() {
      this.router.navigate(['/home']);
    }

    Register() {

      this.router.navigate(['/register']);
    }

    onSubmit(formData: any){
      throw new Error("Method not implemented.");
    }
}