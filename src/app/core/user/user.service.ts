import { Injectable } from "@angular/core";
import { TokenService } from "../token/token-service";
import { BehaviorSubject } from "rxjs";
import { User } from "./user";
import * as jwt_decode from "jwt-decode";

@Injectable({ providedIn: "root" })
export class UserService {
  // BehaviorSubject é uma variante do Subject que requer um valor inicial e emite seu valor atual sempre que é inscrito.
  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;
    this.userName = user.name;
    this.userSubject.next(user);
  }

  logout() {
    // Apaga o token
    this.tokenService.removeToken();
    // Manda null para o BehaviorSubject para aparecer a mensagem de login novamente
    this.userSubject.next(null)
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }
}
