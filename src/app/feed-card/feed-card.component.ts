import { Component, OnInit, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {
    @Input() feed: any;
    @Input() onlyNews: boolean;
    @Input() lang: string = 'en';

    private copy = [];
    private watchOnlyNew: boolean = true;
    private alphabet = ['a','b','c','d','e','f','g','h','i','g','k','l','m','n',
                        'o','p','q','r','s','t','u','v','w','x','y','z'];
    private type = 'pie';
    private data = {
      labels: this.alphabet,
      datasets: [
        {
            label: "Char",
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }
      ]
    };
    private options = {
      responsive: true,
      maintainAspectRatio: false
    };
    constructor(private translate: TranslateService) {
        translate.setDefaultLang(this.lang);
        translate.use(this.lang);
      }

    ngOnInit() {
    }

    viewFeed(feed: any){
        /*this.copy = Object.assign({}, this.feed);
        console.log(this.copy);*/
        feed.view = true;
        feed.more = !feed.more;
        let datasets = this.data.datasets;

        for (let dataset of datasets){
            dataset.data = [];
        }
        this.countChar(feed.description);
    }
    viewFeedOriginal(feed: any){
        feed.view = true;
        window.open(feed.link);
    }

    countChar(description: string){
        description = description.toLowerCase();
        let count: number;

        for (let index in this.alphabet){
            count = 0;
            for (let char of description){
                this.alphabet[index] == char ? count++ : count;
            }
            this.pushDataset(count);
        }
    }

    pushDataset(count: number){
        let datasets = this.data.datasets;
        for (let dataset of datasets){
            dataset.data.push(count);
        }
    }
}
