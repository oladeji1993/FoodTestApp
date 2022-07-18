import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MustMatch } from 'src/app/utils/Must-match';
import {Validator} from '../../utils/validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: any;
  lastname: any;
  email: any;
  password: any;
  phone: any;
  DateOfBirth:any
  img: any;
  ConfirmPassword:any

  myForm: FormGroup;
  public submitted = false; 
  errorMessages: any = [];

  constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private loading: LoadingService,
      private router: Router

  ) {
      // this.errorMessages = Validator.errorMessages
      // this.myForm = this.formBuilder.group({
      //     name: Validator.nameValidator,
      //     lastname: Validator.lastname,
      //     phone: Validator.MobileNo,
      //     DateOfBirth : Validator.DateOfBirth,
      //     email: Validator.emailValidator,
      //     password: Validator.passwordValidator,
      //     ConfirmPassword : Validator.ConfirmPassword
      // })
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.myForm = this.formBuilder.group({
      name: [undefined, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      phone: [null, [Validators.required, Validators.pattern(("[6-9]\\d{9}"))]],
      DateOfBirth: [null, Validators.compose([Validators.required])],
      email: [null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      ConfirmPassword: ['', Validators.compose([Validators.required])]
  },
  {
    validator: MustMatch('password', 'ConfirmPassword')
  });
  }


  register(){
    this.submitted = true; 
    if(this.myForm.invalid){
      return
    }
    const {name, lastname, phone, email, password,DateOfBirth, ConfirmPassword} = this.myForm.value
    let fd: FormData = new FormData();
    fd.append('FirstName', name);
    fd.append('LastName', lastname);
    fd.append('EmailAddress', email);
    fd.append('MobileNo', "0" + phone.toString());
    fd.append('DateOfBirth', DateOfBirth);
    fd.append('Password', password);
    fd.append('ConfirmPassword', ConfirmPassword);
    this.loading.show()
    this.authService.register(fd).subscribe(data => {
      if(data){
        this.loading.hide()
        this.router.navigate(['/login'])
        this.formReset(this.myForm)
        this.loading.showSuccess('You have signed up successfully')
      }else{  
        this.loading.hide()
        this.loading.showFailure('Error in signing up')
      } 
    }, err => {
      console.log(err)
      this.loading.hide()
      this.loading.showFailure(err.error.message)
    })
  }


  formReset(form: any) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors('');
    });
  }

}
