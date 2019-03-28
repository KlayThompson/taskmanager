import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import {ItemAnim} from '../../anim/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    ItemAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;
  ItemAnimate = 'out';
  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
    console.log(this.avatar);
  }

  checkBoxClick(event) {
    event.stopPropagation();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.ItemAnimate = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.ItemAnimate = 'out';
  }
}
