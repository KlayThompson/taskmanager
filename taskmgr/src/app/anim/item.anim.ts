import {trigger, state, style, animate, transition} from '@angular/animations';

export const ItemAnim = trigger('item', [
  state('out', style({'border-left-width': '3px'})),
  state('hover', style({'border-left-width': '8px'})),
  transition('out=>hover', animate('200ms ease-in')),
  transition('hover=>out', animate('200ms ease-out'))
]);
