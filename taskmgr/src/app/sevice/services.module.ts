import {NgModule} from '@angular/core';
import {QuoteService} from './quote.service';
import {ProjectService} from './project.service';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import {TaskService} from './task.service';
import {TaskListService} from './task-list.service';

@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService,
        AuthService,
        AuthGuardService,
        TaskService,
        TaskListService
      ]
    };
  }

}
