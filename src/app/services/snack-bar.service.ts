import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

import { SnackBarComponent } from '../shared/components/snack-bar/snack-bar.component'

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  openSnackBar(message: string, duration = 2000) {
    this.snackBar.openFromComponent(SnackBarComponent, { duration, data: message })
  }

  constructor(private snackBar: MatSnackBar) {}
}
