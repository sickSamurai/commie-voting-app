import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule } from '@angular/router'

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component'
import { SnackBarComponent } from './components/snack-bar/snack-bar.component'
import { NotFoundPageComponent } from './not-found-page/not-found-page.component'

const AngularMaterialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  RouterModule
]

@NgModule({
  declarations: [SnackBarComponent, ConfirmationDialogComponent, NotFoundPageComponent, InfoDialogComponent],
  imports: [CommonModule, RouterModule, ...AngularMaterialModules],
  exports: [...AngularMaterialModules]
})
export class SharedModule {}
