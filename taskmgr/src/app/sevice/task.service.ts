import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {TaskModel} from '../domain/task.model';
import {map, mapTo, mergeMap, reduce} from 'rxjs/operators';
import {TaskListModel} from '../domain/task-list.model';

@Injectable()
export class TaskService {

  private readonly domain = 'tasks';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(@Inject('BASE_CONFIG') private config, private http: HttpClient) {

  }

  getTask(taskListId: string): Observable<TaskModel[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {headers: this.headers, params: {'taskListId': taskListId}}).pipe(
      map(t => t as TaskModel[])
    );
  }

  add(task: TaskModel): Observable<TaskModel> {
    const uri = `${this.config.uri}/${this.domain}`;
    const updateTask = {
      id: task.id,
      desc: task.desc,
      completed: task.completed,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      priority: task.priority,
      reminder: task.reminder,
      createDate: task.createDate
    };
    return this.http.post(uri, JSON.stringify(updateTask), {headers: this.headers}).pipe(
      map(res => res as TaskModel)
    );
  }

  update(task: TaskModel): Observable<TaskModel> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const updateTask = {
      desc: task.desc,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      priority: task.priority,
      reminder: task.reminder,
    };
    return this.http.patch(uri, JSON.stringify(updateTask), {headers: this.headers}).pipe(
      map(res => res as TaskModel)
    );
  }

  del(task: TaskModel): Observable<TaskModel> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete(uri).pipe(mapTo(task));
  }

  getbyLists(lists: TaskListModel[]): Observable<TaskModel[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return from(lists).pipe(
      mergeMap(list => this.getTask(list.id)),
      reduce((tasks, t) => [...tasks, ...t])
    );
  }
}
