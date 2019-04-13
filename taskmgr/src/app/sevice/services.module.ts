import {ModuleWithProviders, NgModule} from '@angular/core';
import {QuoteService} from './quote.service';

@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService
      ]
    };
  }

}
