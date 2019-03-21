import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      'name': '企业协作平台',
      'desc': '这是一个企业内部项目',
      'coverImg': 'assets/img/covers/0.jpg'
    },
    {
      'name': '自动化测试项目',
      'desc': '这是一个企业内部项目',
      'coverImg': 'assets/img/covers/1.jpg'
    }
  ]
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectClick() {
   const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新建项目'}});
   dialogRef.afterClosed().subscribe(data => console.log(data));
  }

  openInviteUserDialog() {
    console.log('收到了邀请');
    const dialogRef = this.dialog.open(InviteComponent);
    dialogRef.afterClosed().subscribe();
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '您确认删除本项目所有内容吗？'}});
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  openNewProjectDialog() {
    this.dialog.open(NewProjectComponent, {data: {title: '修改项目'}});
  }
}
