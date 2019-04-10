import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form = this.fb.group({
    email: ['sunshinenate@sina.com', Validators.compose([Validators.required, Validators.email, this.emailValidate])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup, ev: Event) {
    ev.preventDefault();
    console.log(form.valid);
  }

  emailValidate(c: FormControl): {[key: string]: any} {
    if (!c.value) {
      return null;
    }
    const pattern = /^sunshine+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValidate: 'The email must start with wang.'
    }
  }
}

