import { Component, OnInit } from '@angular/core';
import { FeedServiceService } from './feed-service.service';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private feedUrl: string = 'https://codek.tv/feed/';
  private feeds: any;

  constructor(private feedService: FeedServiceService) {}

  ngOnInit(){
    this.refreshFeed();
  }

  private refreshFeed() {
    this.feedService.getFeedContent(this.feedUrl)
        .subscribe(
                   feed => this.feeds = feed.items,
                   error => console.log(error));
  }

}
