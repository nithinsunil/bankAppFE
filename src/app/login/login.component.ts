import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  desc = "Your Perfect Banking Partner!! "


  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login() {

    var acno = this.loginForm.value.acno
    var pwd = this.loginForm.value.pwd

    if (this.loginForm.valid) {
      // asynchronous
      this.ds.login(acno, pwd)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem("currentUserName", JSON.stringify(result.currentUserName))
            localStorage.setItem("currentAcno", JSON.stringify(result.currentAcno))
            localStorage.setItem("token", JSON.stringify(result.token))
            alert(result.message)
            this.router.navigateByUrl("dashboard")
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert("invalid form")
    }
  }



}
