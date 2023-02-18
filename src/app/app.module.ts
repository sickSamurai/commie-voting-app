import { NgModule } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { environment } from '../environments/environment'
import { AngularMaterialModule } from './angular-material/angular-material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CandidatesFormComponent } from './components/candidates-form/candidates-form.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { VotingCreationFormComponent } from './components/voting-creation-form/voting-creation-form.component'
import { CreationPageComponent } from './pages/creation-page/creation-page.component'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'
import { ResultsPageComponent } from './pages/results-page/results-page.component'
import { VotingPageComponent } from './pages/voting-page/voting-page.component';
import { VotingFormComponent } from './components/voting-form/voting-form.component'

@NgModule({
  declarations: [
    AppComponent,
    CreationPageComponent,
    VotingPageComponent,
    ResultsPageComponent,
    NotFoundPageComponent,
    VotingCreationFormComponent,
    CandidatesFormComponent,
    NavbarComponent,
    VotingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
