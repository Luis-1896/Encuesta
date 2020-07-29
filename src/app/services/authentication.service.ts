import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<firebase.User>;
  private _userID: string;


  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.user;
    this._userID = sessionStorage.getItem('idPreviusUser');
  }

  get userID(): string {
    return this._userID;
  }

  set userID(newUserID: string) {
    this._userID = newUserID;
  }

  signup(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
      })
      .catch(err => console.log(err));
  }

  logout() {
    return this.angularFireAuth.auth.signOut()
      .then(() => {
        sessionStorage.clear();
      })
      .catch(err => console.log(err));
  }


}
