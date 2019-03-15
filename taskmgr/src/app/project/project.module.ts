import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjecItemComponent } from './projec-item/projec-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import {SharedModule} from '../shared/shared.module';
import {ProjectRoutingModule} from './project-routing.module';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjecItemComponent,
    NewProjectComponent,
    InviteComponent
  ],
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  entryComponents: [
    NewProjectComponent,
    InviteComponent
  ]
})
export class ProjectModule { }
