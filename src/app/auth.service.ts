import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  PASS_SESSION_ATTRIBUTE_NAME = 'userid';

  public username: String;
  public password: String;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	
  constructor(private http: HttpClient) {	
    if (sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME) !== null){   
     	this.loggedIn.next(true);
     	this.username = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
        this.password = sessionStorage.getItem(this.PASS_SESSION_ATTRIBUTE_NAME);          	
     }
  }

  authenticationService(username: String, password: String) {
    return this.http.get(`http://localhost:8080/auth/api/v1/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
        this.loggedIn.next(true);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    sessionStorage.setItem(this.PASS_SESSION_ATTRIBUTE_NAME, password)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.PASS_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null){
     	return this.loggedIn.asObservable();
     } else{
    	return this.loggedIn.asObservable();
     }
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}