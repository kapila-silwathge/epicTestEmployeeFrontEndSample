import { EmployeeDetailsComponent } from './../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { EmployeeService } from "./../employee.service";
import { Employee } from "./../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  isLoggedIn : Observable<boolean>;
  constructor(private employeeService: EmployeeService,
    private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.reloadData();
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(id: number){
    this.router.navigate(['employee/details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['employee/update', id]);
  }
  
  addEmployee(){
    this.router.navigate(['employee/add']);
  }
}
