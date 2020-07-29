import { Component, OnInit } from '@angular/core';
import { UserSurvey } from 'src/app/interfaces/userSurvey.interfaces';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  surveyResponders: UserSurvey[];
  surveyAnswered: number;
  surveyNotAnswered: number;

  doughnutChartLabels: Label[] = ['Survey Answered', 'Survey Not Answered'];
  doughnutChartData: MultiDataSet = [
    [0, 0]
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors = [
    {
      backgroundColor: ['rgba(0, 0, 255, 0.8)', 'rgba(255, 0, 0, 0.8)']
    }
  ];

  constructor(private userServices: UserService, private router: Router) { }

  ngOnInit() {
    this.userServices.getUser().subscribe(user => {
      this.surveyResponders = user.map(survey => {
        return {
          id: survey.payload.doc.id,
          ...survey.payload.doc.data()
        };
      });
    });
  }

  information(index: number) {
    sessionStorage.setItem('userSurveyId', this.surveyResponders[index].id);
    this.router.navigate(['/results']);
  }

  updateSurvey() {
    this.surveyAnswered = 0;
    this.surveyNotAnswered = 0;
    for (const idUser in this.surveyResponders) {
      if (this.surveyResponders[idUser].admin === false) {
        if (this.surveyResponders[idUser].status === true) {
          this.surveyAnswered = this.surveyAnswered + 1;
        } else {
          this.surveyNotAnswered = this.surveyNotAnswered + 1;
        }
      }
    }
    this.doughnutChartData = [[this.surveyAnswered, this.surveyNotAnswered]];
  }
}
