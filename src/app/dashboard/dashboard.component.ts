import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  user: any
  acno: any
  logDate: any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    if (localStorage.getItem("currentUserName")) {
      this.user = JSON.parse(localStorage.getItem("currentUserName") || '')
    }
    this.logDate = new Date // creating a new object 'Date'
  }

  ngOnInit(): void {
    if (!localStorage.getItem("token")) { // !localStorage because if the data is not in LS
      alert("Please Login")
      this.router.navigateByUrl("")
    }
  }


  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })


  acno1 = ""
  pwd1 = ""
  amount1 = ""

  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })


  deposit() {
    var acno = this.depositForm.value.acno
    var pwd = this.depositForm.value.pwd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {
      //asynchronous
      this.ds.deposit(acno, pwd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert("Deposit Form Invalid")
    }
  }

  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var pwd = this.withdrawForm.value.pwd1
    var amount = this.withdrawForm.value.amount1


    if (this.withdrawForm.valid) {
      // asynchronous
      this.ds.withdraw(acno, pwd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert("Invalid Withdraw Form")
    }

  }

  logout() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUserName")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }

  deleteAcc() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || '')
  }

  deleteFromParent(event: any) {
    // asynchronous
    this.ds.deleteAccount(event)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          localStorage.removeItem("currentAcno")
          localStorage.removeItem("currentUserName")
          localStorage.removeItem("token")      
          this.router.navigateByUrl("")
        }
      },
        (result) => {
          alert(result.error.message)
        }
      )
  }

  cancelFromParent() {
    this.acno = ""
  }

}
