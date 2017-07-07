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

  constructor(private feedService: FeedServiceService,private translate: TranslateService) {

    console.log(localStorage.getItem("feeds"));
    console.log(localStorage.getItem('links'));

    if (localStorage.getItem('lang')){
      this.lang = localStorage.getItem('lang')
    } else {
      this.lang = 'en'};

    if (localStorage.getItem('links')){
      let linksOld = JSON.parse(localStorage.getItem('links'));
      console.log(linksOld);
      // this.links = Object.assign({}, linksOld);
    }

    /*let feeds = JSON.stringify(localStorage.getItem('feeds'));*/

    if (localStorage.getItem('feeds')){
      let feedsOld = Object.assign({}, localStorage.getItem('feeds'))
      console.log(feedsOld);
    }

    translate.setDefaultLang(this.lang);
    translate.use(this.lang);
  }

  ngOnInit(){
    // this.copy = Object.assign({}, this.feed);

  }
  private onOnlyNews(){
    this.onlyNews = !this.onlyNews;
  }
  private langChoose(){
    this.lang == 'en' ? this.lang = 'ru' : this.lang = 'en';
    this.translate.use(this.lang);
    localStorage.setItem('lang', this.lang);
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

  private countAuthors(){
    let count: number = 0;
    if (this.feeds){
      count = 1;
      for (let feedI of this.feeds){
        for (let feedJ of this.feeds){
          feedI.author != feedJ.author ? count++ : count;
        }
      }
    }
    return count;
  }

  private viewStat(){
    let countFeed;
    let countLink = this.countLink();
    let countAuthor: number;
    if (this.feedUrl == ''){
      countFeed = 'Not selected';
    } else {
      countFeed = this.countFeed() + ' feeds';
    }
    alert('On this channel '+ countFeed + '\n' + this.countAuthors() + ' authors\n\nIn total: ' + countLink + ' channel\n');
  }

  private addLink(){
    this.links.push(new Link(this.name, this.url));
    this.name = this.url = '';
    localStorage.setItem("links",JSON.stringify(this.links));
  }

  private delLink(link: any){
    let index: number = this.links.indexOf(link);
    this.links.splice(index, 1);
    if (link.url == this.feedUrl){
      this.feedUrl = '';
      this.refreshFeed();
    }
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
    localStorage.setItem("feeds", JSON.stringify(this.feeds));
    console.log(localStorage.getItem("feeds"));
  }

}
