import { Survey } from './../../interfaces/survey.intefaces';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  optionSelect: string;
  typeOption = [
    'good',
    'bad'
  ];
  statusSurvey: boolean;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  survey(form: HTMLFormElement) {
    const data: Survey = form.value;
    data.answer3 = this.optionSelect;
    this.statusSurvey = true;
    this.userService.addSurvey(data)
      .then(() => {
        this.userService.updateStatusSurvey(this.statusSurvey);
        this.authenticationService.logout()
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

}
