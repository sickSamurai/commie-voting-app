import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CreationPageComponent } from './pages/creation-page/creation-page.component'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'
import { ResultsPageComponent } from './pages/results-page/results-page.component'
import { VotingPageComponent } from './pages/voting-page/voting-page.component'

const routes: Routes = [
  { path: 'voting', component: VotingPageComponent },
  { path: '', redirectTo: 'creation', pathMatch: 'full' },
  { path: 'creation', component: CreationPageComponent },
  { path: 'results', component: ResultsPageComponent },
  { path: '**', component: NotFoundPageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
