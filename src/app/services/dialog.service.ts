import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { map } from 'rxjs'

import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component'
import { InfoDialogComponent } from '../shared/components/info-dialog/info-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  getResponse(message: string) {
    const data = { message }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data })
    return dialogRef.afterClosed().pipe(map(result => result as boolean))
  }

  showInformation(title: string, message: string) {
    const data = { title, message }
    this.dialog.open(InfoDialogComponent, { data })
  }

  constructor(private dialog: MatDialog) {}
}
