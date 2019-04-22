import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {TaskModel} from '../domain/task.model';
import {map, mapTo, mergeMap, reduce} from 'rxjs/operators';
import {TaskListModel} from '../domain/task-list.model';

@Injectable()
export class TaskListService {

  private readonly domain = 'taskLists';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(@Inject('BASE_CONFIG') private config, private http: HttpClient) {

  }

  get(projectId: string): Observable<TaskListModel[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {headers: this.headers, params: {'projectId': projectId}}).pipe(
      map(t => t as TaskListModel[])
    );
  }

  add(taskList: TaskListModel): Observable<TaskListModel> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(taskList), {headers: this.headers}).pipe(
      mapTo(taskList) // (res => res as TaskListModel)
    );
  }

  update(taskList: TaskListModel): Observable<TaskListModel> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const updateTask = {
      name: taskList.name
    };
    return this.http.patch(uri, JSON.stringify(updateTask), {headers: this.headers}).pipe(
      map(res => res as TaskListModel)
    );
  }

  del(taskList: TaskListModel): Observable<TaskListModel> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http.delete(uri).pipe(mapTo(taskList));
  }
}
