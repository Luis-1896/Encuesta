import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isOpen: boolean;
  private isClient = false;
  private isAdmin = false;
  private isSuperAdmin = false;
  private NameUser = '';

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.authenticationService.user.subscribe(user => {
      if (user) {
        this.isClient = true;
        this.userService.getUserData().subscribe(data => {
          if (data['admin']) {
            this.isAdmin = true;
          }
          if (data['superadmin']) {
            this.isSuperAdmin = true;
          }
        });
      } else {
        this.isClient = false;
        this.authenticationService.userID = '';
      }
    });
  }

  reInitializeEnvironmentVariables() {
    this.isClient = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
  }

  logoutButtonClicked() {
    this.reInitializeEnvironmentVariables();
    this.authenticationService.logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err));
  }

}
