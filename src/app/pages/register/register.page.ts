import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) { }

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
