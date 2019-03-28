import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {CardAnim} from '../../anim/card.anim';

@Component({
  selector: 'app-projec-item',
  templateUrl: './projec-item.component.html',
  styleUrls: ['./projec-item.component.scss'],
  animations: [
    CardAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjecItemComponent implements OnInit {

  @Input() item;
  @Output() inviteEmit = new EventEmitter();
  @Output() delEmit = new EventEmitter();
  @Output() editEmit = new EventEmitter();
  @HostBinding('@card')cardState = 'out';

  constructor() { }

  ngOnInit() {
  }

  inviteUserClick() {
    console.log('点击了邀请');
    this.inviteEmit.emit();
  }

  deleteButtonClick() {
    this.delEmit.emit();
  }

  editButtonClick() {
    this.editEmit.emit();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }
}
