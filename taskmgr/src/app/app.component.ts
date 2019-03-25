import { Component } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('signal', [
      state('void', style({
        transform: 'translateY(-100%)'
      })),
      state('go', style({
        backgroundColor: 'red',
        height: '150px'
      })),
      state('stop', style({
        backgroundColor: 'green',
        height: '100px'
      })),
      transition('void=>*', animate(500, keyframes([
        style({transform: 'scale(0)'}),
        style({transform: 'scale(0.1)'}),
        style({transform: 'scale(0.3)'}),
        style({transform: 'scale(0.6)'}),
        style({transform: 'scale(0.8)'}),
        style({transform: 'scale(1)'}),
        style({transform: 'scale(1.2)'}),
        style({transform: 'scale(1)'}),
      ]))),
      transition('*=>*', animate('.5s 1s cubic-bezier(0.2, 0.8, 0.3, 1.8)'))
    ])
  ]
})
export class AppComponent {

  darkTheme = false;
  signal: string;
  constructor(private oc: OverlayContainer) {

  }
  switchTheme(dark: boolean) {
    this.darkTheme = dark;
    this.oc.getContainerElement().classList.add(dark ? 'app-dark-theme' : null);
  }

  go() {
    this.signal = 'go';
  }

  stop() {
    this.signal = 'stop';
  }
}
