import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component'

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'voting',
    loadChildren: () => import('./website/website.module').then(module => module.WebsiteModule)
  },
  { path: '', redirectTo: 'voting', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
