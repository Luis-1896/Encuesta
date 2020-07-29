import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SurveyComponent } from './components/survey/survey.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResultsComponent } from './components/admin/results/results.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'results', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
