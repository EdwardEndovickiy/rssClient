import { Component, OnInit, Output } from '@angular/core';
import { FeedServiceService } from './feed-service.service';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {TranslateService} from '@ngx-translate/core';

import { Link } from './link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ FeedServiceService ]
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
  private onlyNews: boolean = false;
  private lang: string;

  constructor(private feedService: FeedServiceService, private translate: TranslateService) {
    if (localStorage.getItem('lang')){
      this.lang = localStorage.getItem('lang')
    } else {
      this.lang = 'en'};

    translate.setDefaultLang(this.lang);
    translate.use(this.lang);

    if (localStorage.getItem('links')) {
      this.links = JSON.parse(localStorage.getItem("links"));
    }

    if (localStorage.getItem('feeds') && localStorage.getItem('feeds') != null) {
      this.feeds = JSON.parse(localStorage.getItem("feeds"));
    }

    if (localStorage.getItem('onlyNews') && localStorage.getItem('onlyNews') != JSON.stringify(this.onlyNews) ) {
      this.onlyNews = !this.onlyNews;
    }
  }

  ngOnInit(){
    if (localStorage.getItem('url') && localStorage.getItem('feeds') == 'undefined') {
      this.feedUrl = localStorage.getItem("url");
      this.refreshFeed();
    }
  }

  private jsonStringify(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  private onOnlyNews(){
    this.onlyNews = this.feedService.onOnlyNews(this.onlyNews);
  }

  private langChoose(){
    this.lang == 'en' ? this.lang = 'ru' : this.lang = 'en';
    this.translate.use(this.lang);
    localStorage.setItem('lang', this.lang);
  }

  private countFeed() {
    return this.feedService.countFeed(this.feeds);
  }

  private countAuthors(){
    return this.feedService.countAuthors(this.feeds);
  }

  private viewStat(){
    let countFeed: any;
    if (this.feedUrl == ''){
      countFeed = 'Not selected';
    } else {
      countFeed = this.feedService.countFeed(this.feeds) + ' feeds';
    }
    alert('On this channel '+ countFeed + '\n' + this.feedService.countAuthors(this.feeds) +
          ' authors\n\nIn total: ' + this.links.length + ' channel\n');
  }

  private addLink(){
    this.links.push(new Link(this.name, this.url));
    this.name = this.url = '';
    this.jsonStringify('links', this.links);
  }

  private delLink(link: any){
    let index: number = this.links.indexOf(link);
    this.links.splice(index, 1);
    if (link.url == this.feedUrl){
      this.feedUrl = '';
      this.jsonStringify("url", this.feedUrl);
      this.refreshFeed();
    }
    this.jsonStringify("links", this.links);
  }

  private goToLink(link: string){
    this.feedUrl = link;
    localStorage.setItem("url", link);
    this.refreshFeed();
  }

  private refreshFeed() {
    this.feedService.getFeedContent(this.feedUrl)
        .subscribe(
                   feed => this.feeds = feed.items,
                   error => console.log(error));

  }
}
