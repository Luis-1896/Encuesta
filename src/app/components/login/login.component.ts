import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login(form: HTMLFormElement) {
    const data = form.value;
    this.authenticationService.login(data.email, data.password)
      .then(() => {
        this.authenticationService.user.subscribe(user => {
          sessionStorage.setItem('idPreviusUser', user.uid);
        });

        this.router.navigate(['/survey'])
          .then(() => {
            location.reload();
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

}
