import { Injectable } from '@angular/core';
import { Http, URLSearchParams }  from '@angular/http';
import { Article } from './article' ;
import { environment } from '../environments/environment'
import 'rxjs/add/operator/toPromise';



@Injectable()
export class ArticleService {

  constructor(
     private http: Http
  ) { }

  public getArticles(): Promise<Article[]>  {
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    params.set('source', 'reddit-r-all')

    return this.http
            .get(`${environment.baseUrl}/v1/articles`, {
              search: params
            })
            .toPromise()
            .then(resp=> resp.json())
            .then(json => json.articles)
            .then(articles => {
              console.log('articles --->',articles)
              const list = articles
                          .map(article =>
                           Article.fromJSON(article))
              console.log('json ->', list);
              return articles;
            }).catch(error => {
              console.log('we got error', error);
            });
  }
}