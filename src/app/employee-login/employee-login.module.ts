import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[EmployeeLoginComponent]
})
export class EmployeeLoginModule { }
