import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header: string;
  @Output() newTask = new EventEmitter<void>();
  @Output() removeAll = new EventEmitter<void>();
  @Output() editTaskList = new EventEmitter<void>();
  @Output() delEmit = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  newTaskButtonClick() {
    this.newTask.emit();
  }

  removeButtonClick() {
    this.removeAll.emit();
  }

  editButtonClick() {
    this.editTaskList.emit();
  }

  deleteButtonCLick() {
    this.delEmit.emit();
  }
}
