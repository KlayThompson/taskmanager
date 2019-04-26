import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewTaskComponent} from '../new-task/new-task.component';
import {CopyTaskComponent} from '../copy-task/copy-task.component';
import {NewTaskListComponent} from '../new-task-list/new-task-list.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {SliderToRightAnim} from '../../anim/router.anim';
import {TaskListService} from '../../sevice/task-list.service';
import {TaskService} from '../../sevice/task.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [SliderToRightAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  lists;

  @HostBinding('@routerAnim') state;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service: TaskListService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.service.get('Sk2HaTagb').pipe(
      switchMap(res => ({...this.lists, res}))
    )
      .subscribe(res => {
        this.lists = res;
        console.log(res);
        this.cd.markForCheck();
    });
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
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.cd.markForCheck();
    });
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handling list');
        break;
      default:
        break;
    }
    console.log(JSON.stringify(list));
  }

  quickTask(desc: string) {
    console.log(desc);
  }
}
