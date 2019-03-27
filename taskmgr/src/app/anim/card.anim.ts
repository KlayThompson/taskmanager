import {trigger, state, style, animate, transition} from '@angular/animations';

export const CardAnim = trigger('card', [
  state('out', style({transform: 'scale(1)', 'box-shadow': 'none'})),
  state('hover', style({transform: 'scale(1.03)', 'box-shadow': '3px 3px 5px 6px #ccc'})),
  transition('out=>hover', animate('200ms ease-in')),
  transition('hover=>out', animate('200ms ease-out'))
]);
