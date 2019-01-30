import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../authenticate/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  authenticateRoute(route) {
    this.afAuth.authState.subscribe(user => {        // checking if user logged in
      if (user && user.uid) {
        // console.log(user.uid);
        this.router.navigate([route]);    // if user logged in then navigate to new resume form
      } else {
        this.router.navigate(['/login']);          // if user not logged in then redirect to login page
      }
    });
  }

  logout() {
    this.authService.doLogout();
  }
}
