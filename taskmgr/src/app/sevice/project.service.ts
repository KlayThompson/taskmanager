import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {ProjectModel} from '../domain/project.model';
import {count, map, mergeMap, switchMap} from 'rxjs/operators';

@Injectable()
export class ProjectService {

  private readonly domain = 'projects';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
    ) {}

    // 获取project列表，传入userID
    get(userId: string): Observable<ProjectModel[]> {
      const uri = `${this.config.uri}/${this.domain}`;
      return this.http.get(uri, {headers: this.headers, params: {'members_like': userId}}).pipe(
        map(res => res as ProjectModel[])
      );
    }

    // post提交project
    add(project: ProjectModel): Observable<ProjectModel> {
      const uri = `${this.config.uri}/${this.domain}`;
      return this.http.post(uri, JSON.stringify(project), {headers: this.headers}).pipe(
        map(p => p as ProjectModel)
      );
    }

    // 理论上是put修改，这里使用patch，只提交可以更改的内容，其他内容不更新
    update(project: ProjectModel): Observable<ProjectModel> {
      const uri = `${this.config.uri}/${this.domain}/${project.id}`;
      const needUpdate = {
        name: project.name,
        desc: project.desc,
        coverImg: project.coverImg
      };
      return this.http.patch(uri, JSON.stringify(needUpdate), {headers: this.headers}).pipe(
        map(res => res as ProjectModel)
      );
    }

    // 删除 delete
  deleteProject(project: ProjectModel): Observable<ProjectModel> {
    // 删除任务
    const delTask$ = from(project.taskLists ? project.taskLists : []).pipe(
      mergeMap(listId => this.http
        .delete(`${this.config.uri}/taskLists/${listId}`)),
      count()
    );
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    return delTask$.pipe(
      switchMap(() => this.http.delete(uri).pipe(
        map(p => p as ProjectModel)
      ))
    );
  }
}
