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
import { IssueNewThankyouComponent } from './issue/issue-new/issue-new-thankyou/issue-new-thankyou.component';
import { IssueEditComponent } from './issue/issue-edit/issue-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import 'firebase/storage';
import 'firebase/database';
import { IssueStartComponent } from './issue/issue-start/issue-start.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { IssueStatusComponent } from './issue/issue-status/issue-status.component';
import { IssueInfoComponent } from './issue/issue-info/issue-info.component';
import { NewIssueService } from './issue/issue-new/issue-new.service';
import { ImageService } from './issue/image.service';
import { IssueRestService } from './issue/issue.service.rest';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    IssueListComponent,
    IssueDetailComponent,
    IssueNewComponent,
    IssueNewMapComponent,
    IssueEditComponent,
    MainComponent,
    AccountComponent,
    InfoComponent,
    ContactComponent,
    IssueNewThankyouComponent,
    IssueStartComponent,
    FooterComponent,
    IssueStatusComponent,
    IssueInfoComponent,
  ],
  imports: [
    BrowserModule,
    Ng2ImgToolsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAVHZHByHkwScBEAJmKGUgC0HTJfNVg6PQ'
    })
  ],
  providers: [
    IssueRestService,
    ImageService,
    NewIssueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
