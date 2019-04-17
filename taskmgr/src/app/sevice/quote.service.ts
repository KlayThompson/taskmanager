import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Quote} from '../domain/quote.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class QuoteService {

  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: HttpClient
  ) { }

  getQuote(): Observable<Quote> {
    console.log('进来没啊');
    const url = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    return this.http.get(url)
      .pipe(map(
      res => res as Quote || new Quote()
    ));
  }
}
