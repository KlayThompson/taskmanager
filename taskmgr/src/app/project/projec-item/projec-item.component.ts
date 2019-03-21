import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-projec-item',
  templateUrl: './projec-item.component.html',
  styleUrls: ['./projec-item.component.scss']
})
export class ProjecItemComponent implements OnInit {

  @Input() item;
  @Output() inviteEmit = new EventEmitter();
  @Output() delEmit = new EventEmitter();
  @Output() editEmit = new EventEmitter();

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
}
