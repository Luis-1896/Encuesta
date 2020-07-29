import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore, private authenticationService: AuthenticationService) { }

  getUserData() {
    return this.angularFirestore.doc(`users/${sessionStorage.getItem('idPreviusUser')}`).valueChanges();
  }

  addNewUser(id: string, name: string, company: string, email: string, password: string, admin: boolean, status: boolean) {
    return this.angularFirestore.doc('users/' + id).set({
      id,
      name,
      company,
      email,
      password,
      admin,
      status
    });
  }

  addSurvey(survey) {
    return this.angularFirestore.collection(`users/${sessionStorage.getItem('idPreviusUser')}/survey`).add(survey);
  }

  updateStatusSurvey(status: boolean) {
    return this.angularFirestore.doc(`users/${sessionStorage.getItem('idPreviusUser')}`).update({
      status
    });
  }

  getUser() {
    return this.angularFirestore.collection('users').snapshotChanges();
  }

  getsurvey() {
    return this.angularFirestore.collection(`users/${sessionStorage.getItem('userSurveyId')}/survey`).snapshotChanges();
  }
}
