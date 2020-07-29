import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private hidePassword = true;
  private hidePasswordRepeat = true;
  private errorMessage: string;
  private toEmail: string;
  private toPassword: string;
  private toName: string;

  private newAdmin = false;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(data => {
      if (data['superadmin']) {
        this.newAdmin = true;
      } else {
        this.newAdmin = false;
      }
    });

  }

  signup(form: HTMLFormElement) {
    const data: User = form.value;
    data.admin = this.newAdmin;
    data.status = false;
    this.toEmail = data.email;
    this.toPassword = data.password;
    this.toName = data.name;
    const templateParams = {
      subject: 'Survey for Antware',
      linkToSurvey: 'https://antware-survey.herokuapp.com/',
      toEmail: this.toEmail,
      toPassword: this.toPassword,
      toName: this.toName
    };
    this.authenticationService.signup(data.email, data.password)
      .then(reault => {
        this.errorMessage = '';
        this.userService.addNewUser(reault.user.uid, data.name, data.company, data.email, data.password, data.admin, data.status)
        .then(() => {
          emailjs.send('gmail', 'Contact-form', templateParams, 'user_jhFgfg3voYcjQoR5aJEws')
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
          }, (err) => {
            console.log('FAILED...', err);
          });
        })
        .catch(err => console.log(err));
      })
      .catch(err => {
        this.errorMessage = err.message;
      });
  }

}
