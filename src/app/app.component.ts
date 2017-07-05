import { Component, OnInit } from '@angular/core';
import { FeedServiceService } from './feed-service.service';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Link } from './link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private feedUrl: string = '';
  private feeds: any;
  private links: Link[] = [
    {name: "habr", url: "http%3A%2F%2Ffeed.exileed.com%2Fvk%2Ffeed%2Fhabr"},
    {name: "brickhouse", url: "http://feeds.twit.tv/brickhouse.xml"}
  ];
  private name: string = '';
  private url: string = '';

  constructor(private feedService: FeedServiceService) {}

  ngOnInit(){
    this.refreshFeed();
  }

  private countFeed() {
    let count: number = 0;
    for (let index in this.feeds){
      !this.feeds[index].view ? count++ : count;
    }
    return count;
  }

  private countLink(){
    let countLink: number = this.links.length;
    return countLink;
  }

  private viewStat(){
    let countFeed;
    let countLink = this.countLink();;
    if (this.feedUrl == ''){
      countFeed = 'Not selected';
    } else {
      countFeed = this.countFeed() + ' feeds';
    }
    alert('On this channel '+ countFeed + '\n\n' + 'In total: ' + countLink + ' channel');
  }
  private addLink(){
    this.links.push(new Link(this.name, this.url));
    this.name = this.url = '';
  }
  private delLink(link: any){
    let index: number = this.links.indexOf(link);
    this.links.splice(index, 1);
  }

  private goToLink(link: string){
    this.feedUrl = link;
    this.refreshFeed();
  }

  private refreshFeed() {
    this.feedService.getFeedContent(this.feedUrl)
        .subscribe(
                   feed => this.feeds = feed.items,
                   error => console.log(error));
  }

}
