import { Component } from '@angular/core'
import { VotingService } from 'src/app/services/voting.service'

import { SnackBarService } from '../../../services/snack-bar.service'

@Component({
  selector: 'app-voting-management-page',
  templateUrl: './voting-management-page.component.html',
  styleUrls: ['./voting-management-page.component.scss']
})
export class VotingManagementPageComponent {
  startVoting() {
    if (this.votingService.startVoting()) this.snackBarService.openSnackBar('Votación(es) iniciada con éxito')
    else if (this.votingService.votingStatus.getValue() === 'started')
      this.snackBarService.openSnackBar('Ya hay una votación en curso')
    else this.snackBarService.openSnackBar('Debes crear al menos una votación antes de iniciar')
  }

  finishVoting() {
    if (this.votingService.finishVoting())
      this.snackBarService.openSnackBar('Votación finalizada con éxito. Ya puedes mirar los resultados')
    else this.snackBarService.openSnackBar('No hay ninguna votación activa')
  }

  deleteAllVoting() {
    if (this.votingService.resetVoting()) this.snackBarService.openSnackBar('Votación(es) eliminada con éxito')
    else this.snackBarService.openSnackBar('Debes finalizar las votaciones activas antes de poder eliminarlas')
  }

  constructor(private votingService: VotingService, private snackBarService: SnackBarService) {}
}
