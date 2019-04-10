import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required])],
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required])],
    confirmPassword: ['', Validators.compose([Validators.required])]
  });
  items: string[];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
  }
}
