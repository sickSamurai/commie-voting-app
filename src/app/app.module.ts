import { NgModule } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CreationPageComponent } from './pages/creation-page/creation-page.component'
import { VotingPageComponent } from './pages/voting-page/voting-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'

@NgModule({
  declarations: [AppComponent, CreationPageComponent, VotingPageComponent, ResultsPageComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
