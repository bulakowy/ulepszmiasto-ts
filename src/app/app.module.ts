import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './issue/issue-map/issue-map.component';
import { IssueListComponent } from './issue/issue-list/issue-list.component';
import { IssueDetailComponent } from './issue/issue-detail/issue-detail.component';
import { IssueNewComponent } from './issue/issue-new/issue-new.component';
import { IssueNewMapComponent } from './issue/issue-new/issue-new-map/issue-new-map.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import 'firebase/storage';
import 'firebase/database';
import { FooterComponent } from './footer/footer.component';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { IssueStatusComponent } from './issue/issue-status/issue-status.component';
import { NewIssueService } from './issue/issue-new/issue-new.service';
import { ImageService } from './issue/image.service';
import { IssueRestService } from './issue/issue.rest.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { MsgComponent } from './msg/msg.component';
import { MsgService } from './msg/msg.service';
import { MapService } from './issue/issue-map/issue-map.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    IssueListComponent,
    IssueDetailComponent,
    IssueNewComponent,
    IssueNewMapComponent,
    MainComponent,
    AccountComponent,
    InfoComponent,
    ContactComponent,
    FooterComponent,
    IssueStatusComponent,
    MsgComponent,
  ],
  imports: [
    BrowserModule,
    Ng2ImgToolsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAVHZHByHkwScBEAJmKGUgC0HTJfNVg6PQ'
    })
  ],
  providers: [
    IssueRestService,
    ImageService,
    MsgService,
    NewIssueService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
