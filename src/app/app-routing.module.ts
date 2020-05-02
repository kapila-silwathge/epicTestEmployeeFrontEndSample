import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
   {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/add', component: CreateEmployeeComponent },
  { path: 'employee/update/:id', component: UpdateEmployeeComponent },
  { path: 'employee/details/:id', component: EmployeeDetailsComponent },
  {path: 'logout', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
