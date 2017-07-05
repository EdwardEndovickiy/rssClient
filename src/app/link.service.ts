import { Injectable } from '@angular/core';
import { Link } from './link';

@Injectable()
export class LinkService {
  private link: Link[] = [
    {name: "habr", url: "http%3A%2F%2Ffeed.exileed.com%2Fvk%2Ffeed%2Fhabr"},
    {name: "brickhouse", url: "http://feeds.twit.tv/brickhouse.xml"}
  ];
  getLink(): Link[] {
    return this.link;
  }
  addLink(name: string, url: string){
    this.link.push(new Link(name, url));
  }
}
