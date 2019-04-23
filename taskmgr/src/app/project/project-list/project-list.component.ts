import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {SliderToRightAnim} from '../../anim/router.anim';
import {ListAnimation} from '../../anim/list.anim';
import {ProjectService} from '../../sevice/project.service';
import {Observable, range, Subscription} from 'rxjs';
import {filter, map, reduce, switchMap, take} from 'rxjs/operators';
import {ProjectModel} from '../../domain/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [SliderToRightAnim, ListAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projects;
  sub: Subscription;
  @HostBinding('@routerAnim') state;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service: ProjectService
    ) { }

  ngOnInit() {
    this.service.get('1').subscribe(p => {
      this.projects = p;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  /**
   * 新建项目弹窗
   */
  openNewProjectClick() {
    const img = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const thumbnails$ = this.getThumbnailsObs();
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {thumbnails: thumbnails$, img: img}});
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(n => n),
        map(value => ({...value, coverImg: this.buildImgSrc(value.coverImg)})),
        switchMap(value => this.service.add(value)),
      )
      .subscribe(value => {
        this.projects = [...this.projects, value];
        this.cd.markForCheck();
      });
  }

  /**
   * 编辑当前项目弹窗
   * @param project 当前选中的project
   */
  openEditProjectClick(project: ProjectModel) {
    const thumbnails$ = this.getThumbnailsObs();
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {project: project, thumbnails: thumbnails$}});
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => n),
      map(value => ({...value, id: project.id, coverImg: value.coverImg})),
      switchMap(value => this.service.update(value))
    ).subscribe(value => {
      const index = this.projects.map(p => p.id).indexOf(project.id);
      this.projects = [...this.projects.slice(0, index), value, ...this.projects.slice(index + 1)];
      this.cd.markForCheck();
    });
  }

  /**
   * 打开邀请弹窗
   */
  openInviteUserDialog() {
    console.log('收到了邀请');
    const dialogRef = this.dialog.open(InviteComponent);
    dialogRef.afterClosed().subscribe();
  }

  /**
   * 点击删除二次确认弹窗
   * @param project 选中的project
   */
  openConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '您确认删除本项目所有内容吗？'}});
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => n),
      switchMap(_ => this.service.deleteProject(project))
    )
      .subscribe(res => {
      console.log(res);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }

  private getThumbnailsObs(): Observable<string[]> {
    return range(0, 40).pipe(
      map(i => `/assets/img/covers/${i}_tn.jpg`),
      reduce((r: string[], x: string) => {
        return [...r, x];
      }, [])
    );
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
