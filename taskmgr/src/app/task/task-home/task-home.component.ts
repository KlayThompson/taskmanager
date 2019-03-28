import {Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewTaskComponent} from '../new-task/new-task.component';
import {CopyTaskComponent} from '../copy-task/copy-task.component';
import {NewTaskListComponent} from '../new-task-list/new-task-list.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {SliderToRightAnim} from '../../anim/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [SliderToRightAnim]
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

  @HostBinding('@routerAnim') state;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewTaskDialog() {
    this.dialog.open(NewTaskComponent, {data: {title: '新建任务'}});
  }

  openRemoveAllDialog() {
    this.dialog.open(CopyTaskComponent, {data: this.lists});
  }

  openEditDialog(task) {
    this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task}});
  }

  openNewTaskListDialog() {
    this.dialog.open(NewTaskListComponent, {data: {title: '新建任务列表'}});
  }

  openEditNewTaskListDialog() {
    this.dialog.open(NewTaskListComponent, {data: {title: '修改任务列表名称'}});
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表', content: '您确认删除本任务列表所有内容吗？'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}
