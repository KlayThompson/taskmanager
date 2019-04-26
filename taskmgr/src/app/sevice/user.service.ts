import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {User} from '../domain/user.model';
import {ProjectModel} from '../domain/project.model';
import {filter, reduce, switchMap} from 'rxjs/operators';

@Injectable()
export class UserService {

  private readonly domain = 'users';
  private herders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: HttpClient
  ) { }

  /**
   * 根据输入的文字搜索用户
   * @param filter 搜索关键字
   */
  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<User[]>(uri, {params: {'email_like': filter}});
  }

  /**
   * 根据project搜索用户
   * @param projectId 项目ID
   */
  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<User[]>(uri, {params: {'projectId': projectId}});
  }

  /**
   * 将用户同一个project绑定起来
   * @param user 需要绑定的用户
   * @param projectId 需要绑定的项目
   */
  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    return this.http.patch<User>(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.herders});
  }

  /**
   * 将用户从该项目中移除
   * @param user 需要移除的用户
   * @param projectId 项目ID
   */
  removeProjcetRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    const needUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http.patch<User>(uri, JSON.stringify({projectIds: needUpdate}), {headers: this.herders});
  }

  batchUpdateProjectRef(project: ProjectModel): Observable<User[]> {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return from(memberIds).pipe(
      switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get<User>(uri);
      }),
      filter(user => user.projectIds.indexOf(projectId) < 0),
      switchMap(u => this.addProjectRef(u, projectId)),
      reduce((users: User[], currentUser: User) => [...users, currentUser], [])
    );
  }
}
