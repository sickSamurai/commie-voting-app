import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { map } from 'rxjs'

import { DialogComponent } from '../shared/components/dialog/dialog.component'

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  getResponse(message: string) {
    const data = { message }
    const dialogRef = this.dialog.open(DialogComponent, { data })
    return dialogRef.afterClosed().pipe(map(result => result as boolean))
  }

  constructor(private dialog: MatDialog) {}
}
