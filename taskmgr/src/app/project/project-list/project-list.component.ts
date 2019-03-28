import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {SliderToRightAnim} from '../../anim/router.anim';
import {ListAnimation} from '../../anim/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [SliderToRightAnim, ListAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      'id': 1,
      'name': '企业协作平台',
      'desc': '这是一个企业内部项目',
      'coverImg': 'assets/img/covers/0.jpg'
    },
    {
      'id': 2,
      'name': '自动化测试项目',
      'desc': '这是一个企业内部项目',
      'coverImg': 'assets/img/covers/1.jpg'
    }
  ]

  @HostBinding('@routerAnim') state;
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openNewProjectClick() {
   const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新建项目'}});
   dialogRef.afterClosed().subscribe(data => {
     console.log(data);
     this.projects = [...this.projects, {id: 3, name: 'New Project', desc: 'This is a new project', coverImg: 'assets/img/covers/5.jpg'},
       {id: 4, name: 'New Project Again', desc: 'This is a new project again', coverImg: 'assets/img/covers/6.jpg'}];
     this.cd.markForCheck();
   });
  }

  openInviteUserDialog() {
    console.log('收到了邀请');
    const dialogRef = this.dialog.open(InviteComponent);
    dialogRef.afterClosed().subscribe();
  }

  openConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '您确认删除本项目所有内容吗？'}});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '修改项目'}});
    dialogRef.afterClosed().subscribe(data => {
        console.log('');
    });
  }
}
