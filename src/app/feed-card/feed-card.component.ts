import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {
    private more: boolean = false;

    @Input() feed: any;

    ngOnInit() {
    }

    viewFeed(feed: any){
        feed.view = true;
        feed.more = !feed.more;
        this.more = !this.more;
    }
    viewFeedOriginal(feed: any){
        feed.view = true;
        window.open(feed.link);
    }
}
