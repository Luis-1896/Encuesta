import { Survey } from './../../../interfaces/survey.intefaces';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  surveyUser: Survey[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getsurvey().subscribe(survey => {
      this.surveyUser = survey.map(user => {
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        };
      });
    });
  }

  returnAdmin() {
    this.router.navigate(['/admin']);
  }

}
