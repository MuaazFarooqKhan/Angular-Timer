import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription, interval } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';


import { EmployeeModel } from '../employeeModel'
@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {

  EmployeeModel: EmployeeModel

  constructor() {
    this.EmployeeModel = new EmployeeModel();
  }

  startTimer() {
    // When timer start
    this.EmployeeModel.showSendDataButton = false
    this.EmployeeModel.currentDate = new Date()
    this.EmployeeModel.timeLeft.length = 0
    this.EmployeeModel.interval = setInterval(() => {
      // if(this.EmployeeModel.timeLeft > -1) {
      this.getTimeDifferences(this.EmployeeModel.currentDate)
      // this.EmployeeModel.timeLeft++;
      // } else {
      // this.EmployeeModel.timeLeft = 0;
      // }
    }, 1000)

  }

  pauseTimer() {
    clearInterval(this.EmployeeModel.interval);
    this.EmployeeModel.showSendDataButton = true
  }
  getTimeDifferences(timeLeft) {
    // calculate the time difference
    this.EmployeeModel.timeDifference = new Date().getTime() - timeLeft;
    this.allocateTimeUnit(this.EmployeeModel.timeDifference);
  }

  allocateTimeUnit(timeDifference) {
    // calculate the time.
    this.EmployeeModel.secondsToDday = Math.floor((timeDifference) / (this.EmployeeModel.milliSecondsInASecond) % this.EmployeeModel.SecondsInAMinute);
    this.EmployeeModel.minutesToDday = Math.floor((timeDifference) / (this.EmployeeModel.milliSecondsInASecond * this.EmployeeModel.minutesInAnHour) % this.EmployeeModel.SecondsInAMinute);
    this.EmployeeModel.hoursToDday = Math.floor((timeDifference) / (this.EmployeeModel.milliSecondsInASecond * this.EmployeeModel.minutesInAnHour * this.EmployeeModel.SecondsInAMinute) % this.EmployeeModel.hoursInADay);
    this.EmployeeModel.timeLeft = [this.EmployeeModel.hoursToDday, this.EmployeeModel.minutesToDday, this.EmployeeModel.secondsToDday,]
  }

  // Create template form
  addvendor = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })

  addEmployeeName(addvendor) {
    // Add Employee Name
    this.EmployeeModel.name = addvendor.controls.name.value;
  }
  addData() {
    // get data and add to the obj
    this.EmployeeModel.storeEmployeeData.name = this.EmployeeModel.name
    this.EmployeeModel.storeEmployeeData.time = this.EmployeeModel.timeLeft
    // add obj in an array
    this.EmployeeModel.storeData.push({...this.EmployeeModel.storeEmployeeData})
    // clearing the model
    this.EmployeeModel.name=''
    this.EmployeeModel.showSendDataButton =false
    this.EmployeeModel.timeLeft = [0,0,0]
    this.EmployeeModel.storeEmployeeData = {name: null, time: [0,0,0]}
    // Setting the obj in local storage
    localStorage.setItem('time', JSON.stringify(this.EmployeeModel.storeData));
    // get data from the local storage and add in an array
    this.EmployeeModel.showData = JSON.parse(localStorage.getItem('time'))
  }
}
