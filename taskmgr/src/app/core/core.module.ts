import {NgModule, Optional, SkipSelf} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from '../utils/svg.util';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from '../login/login.module';
import {AppRoutingModule} from '../app-routing.module';
import {ServicesModule} from '../sevice/services.module';

import 'hammerjs';
import '../utils/debug.util';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    AppRoutingModule,
    FooterComponent,
    SidebarComponent,
    BrowserAnimationsModule,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    LoginModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer) {
    if (parent) {
      throw new Error('模块已存在，不能再次加载！');
    }

    loadSvgResources(ir, ds);
  }
}
