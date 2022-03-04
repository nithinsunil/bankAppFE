import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  currentUserName: any
  currentAcno: any

  database: any = {
    1000: { acno: 1000, uname: "michael", pwd: "1000", balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "jim", pwd: "1001", balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "pam", pwd: "1002", balance: 5000, transaction: [] },
    1003: { acno: 1003, uname: "dwight", pwd: "1003", balance: 5000, transaction: [] }
  }

  constructor(private http: HttpClient) {
    // this.getDetails()
  }

  // to save details in localStorage
  saveDetails() {
    if (this.database) {
      localStorage.setItem("database", JSON.stringify(this.database))
    }

    if (this.currentUserName) {
      localStorage.setItem("currentUserName", JSON.stringify(this.currentUserName))
    }

    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }

  }


  // to get details from localStorage
  getDetails() {
    if (localStorage.getItem("database")) {
      this.database = JSON.parse(localStorage.getItem("database") || "") // JSON.parse used because db in LS is in string format
    }

    if (localStorage.getItem("currentUserName")) {
      this.currentUserName = JSON.parse(localStorage.getItem("currentUserName") || "")
    }
  }


  getTransaction(acno: any) {
    const data = {
      acno
    }
    // transaction API
    return this.http.post('http://localhost:3000/transaction', data, this.getOption())
  }

  // deleteAccount
  deleteAccount(acno:any){
    // deleteAPI
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }

  // login function
  login(acno: any, pwd: any) {
    const data = {
      acno,
      pwd
    }
    // login API
    return this.http.post("http://localhost:3000/login", data)
  }


  // register function
  register(acno: any, uname: any, pwd: any) {
    const data = {
      acno,
      uname,
      pwd
    }
    return this.http.post("http://localhost:3000/register", data)
  }


  // deposit function
  deposit(acno: any, pwd: any, amt: any) {
    const data = {
      acno,
      pwd,
      amt
    }

    // deposit API
    return this.http.post("http://localhost:3000/deposit", data, this.getOption())

  }

  // to add token inside http header
  getOption() {
    const token = JSON.parse(localStorage.getItem("token") || '')

    let headers = new HttpHeaders()

    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options
  }

  // withdraw function
  withdraw(acno: any, pwd: any, amt: any) {
    const data = {
      acno,
      pwd,
      amt
    }

    // withdraw API
    return this.http.post("http://localhost:3000/withdraw", data, this.getOption())

  }

}
