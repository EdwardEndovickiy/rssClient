import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Feed } from './model/feed';

@Injectable()
export class FeedServiceService {
  private rssToJsonServiceBaseUrl: string = 'https://api.rss2json.com/v1/api.json?rss_url=';
   /*'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fgifs.rss'*/
    constructor(private http: Http) {}

    getFeedContent(url: string): Observable<Feed> {
      return this.http.get(this.rssToJsonServiceBaseUrl + url)
                      .map(this.extractFeeds)
                      .catch(this.handleError);
    }

    private extractFeeds(res: Response): Feed {
      let feed = res.json();
      return feed;
    }

    private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}`: 'Server Error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
