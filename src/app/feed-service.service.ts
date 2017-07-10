import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Feed } from './model/feed';

@Injectable()
export class FeedServiceService {
  private rssToJsonServiceBaseUrl: string = 'https://api.rss2json.com/v1/api.json?rss_url=';

  constructor(private http: Http) {}

  getFeedContent(url: string): Observable<Feed> {
    return this.http.get(this.rssToJsonServiceBaseUrl + url)
                    .map(this.extractFeeds)
                    .catch(this.handleError);
  }

  private extractFeeds(res: Response): Feed {
    let feed = res.json();
    localStorage.setItem("feeds", JSON.stringify(feed.items));
    return feed;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}`: 'Server Error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

  onOnlyNews(onlyNews: boolean){
    onlyNews = !onlyNews;
    localStorage.setItem('onlyNews', JSON.stringify(onlyNews));
    return onlyNews;
  }

  countFeed(feeds: any){
    let count: number = 0;
    for (let index in feeds){
      !feeds[index].view ? count++ : count;
    }
    return count;
  }

  countAuthors(feeds: any){
    let count: number = 0;
    if (feeds){
      count = 1;
      for (let feedI of feeds){
        for (let feedJ of feeds){
          feedI.author != feedJ.author ? count++ : count;
        }
      }
    }
    return count;
  }

}
