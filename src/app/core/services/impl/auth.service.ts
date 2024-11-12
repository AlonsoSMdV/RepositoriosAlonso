import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";
import { IAuthService } from "../interfaces/auth-service.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService implements IAuthService<User>{
  login(email: string, password: string): Observable<User> {
    throw new Error("Method not implemented.");
  }
  register(entity: User): Observable<User> {
    throw new Error("Method not implemented.");
  }
}