import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {

  desc: string;
  @Output() quickTask = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  @HostListener('keyup.enter')
  quickTaskClick() {
    if (!this.desc || this.desc.length === 0 || !this.desc.trim()) {
      return;
    }
    this.quickTask.emit(this.desc);
    this.desc = '';
  }
}
