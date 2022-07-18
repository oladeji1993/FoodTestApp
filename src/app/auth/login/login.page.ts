import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import {Validator} from '../../utils/validator';
import { Login, Register } from '../../@model/auth.model'
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  password: any;
  myForm: FormGroup;
  submitAttempt = false;
  errorMessages: any = [];
  user: any;

  constructor(
      private menu: MenuController,
      private formBuilder: FormBuilder,
      private authService:AuthService,
      private loading: LoadingService,
      private router: Router,


  ) {
      this.errorMessages = Validator.errorMessages
      this.myForm = this.formBuilder.group({
        email: Validator.emailValidator,
        password: Validator.passwordValidator
      })
  }
  ngOnInit() {
  }

  login(){
    const {email, password} = this.myForm.value
    let data = new FormData()
    data.append('Email', email);
    data.append('Password', password);
    this.loading.show()
    this.authService.login(data).subscribe((response:any) =>{
      localStorage.setItem("key", response.access_token)
      if(response){
        this.loading.hide()
        this.resetData()
        this.router.navigate(['/product'])
        this.loading.showSuccess('You have Logged in successfully')
      }else{  
        this.loading.hide()
        this.loading.showFailure('Error in signing in')
      } 
    }, err => {
      this.loading.hide()
      this.loading.showFailure(err.error.title)
    })
  }

  resetData() {
    this.myForm.reset({
      email: '',
      password: '',
    })
  }

}
