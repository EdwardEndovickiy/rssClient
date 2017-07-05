import { BrowserModule }               from '@angular/platform-browser';
import { NgModule }                    from '@angular/core';
import { BrowserAnimationsModule }     from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule,
         MdToolbarModule, MdIconModule,MdTabsModule,
         MdSidenavModule,MdInputModule} from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { StripHtmlTagsPipe } from './pipe/strip-html-tags.pipe';
import { FeedServiceService } from './feed-service.service';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    AppComponent,
    FeedCardComponent,
    StripHtmlTagsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdInputModule,
    MdTabsModule
  ],
  providers: [FeedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
