import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewTaskComponent} from '../new-task/new-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '代办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买杯咖啡',
          completed: true,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date(),
          priority: 1
        },
        {
          id: 2,
          desc: '任务二：完成老板布置的 ppt 作业',
          completed: false,
          owner: {
            id: 2,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          priority: 2
        },
        {
          id: 3,
          desc: '任务一：去星巴克买杯咖啡',
          completed: true,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date(),
          priority: 1
        }
      ],
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务三：项目代码评审',
          completed: false,
          owner: {
            id: 3,
            name: '王五',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          priority: 2
        },
        {
          id: 2,
          desc: '任务四：指定项目计划',
          completed: false,
          owner: {
            id: 2,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          priority: 3
        }
      ],
    }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }
}
