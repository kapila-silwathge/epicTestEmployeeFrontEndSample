import { Component } from '@angular/core';
import { AuthenticationService } from './auth.service';
import { OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject,Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	isLoggedIn : Observable<boolean>;
  	title = 'Epic Test : Employee Front-end Sample';
	constructor(private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }
    ngOnInit() {
        this.isLoggedIn = this.authenticationService.isUserLoggedIn();
        console.log('login ->' + (this.isLoggedIn));
        console.log(this.isLoggedIn);
	  }
	
	  handleLogout() {
	    this.authenticationService.logout();
	  }
	  
	  handleIsUserLoggedIn() {
	    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
	    return this.isLoggedIn;
	  }
}
