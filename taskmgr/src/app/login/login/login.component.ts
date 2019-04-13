import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuoteService} from '../../sevice/quote.service';
import {Quote} from '../../domain/quote.model';

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

  quote: Quote = {
    'id': '0',
    'cn': '我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。',
    'en': 'I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.',
    'pic': '/assets/img/quotes/0.jpg'
  };

  constructor(
    private fb: FormBuilder,
    private service: QuoteService
    ) { }

  ngOnInit() {
    this.service.getQuote()
      .subscribe(q => this.quote = q);
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
    };
  }
}

