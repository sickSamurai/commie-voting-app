import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { VotingDTO } from 'src/app/models/VotingDTO'
import { VotingService } from 'src/app/services/voting.service'

import { DialogService } from '../../../services/dialog.service'
import { SnackBarService } from '../../../services/snack-bar.service'

@Component({
  selector: 'app-voting-management-page',
  templateUrl: './voting-management-page.component.html',
  styleUrls: ['./voting-management-page.component.scss']
})
export class VotingManagementPageComponent implements OnDestroy {
  votingList: VotingDTO[]
  votingListSubscription: Subscription

  subscribeToVotingList() {
    this.votingListSubscription = this.votingService
      .getVotingList()
      .subscribe(votingList => (this.votingList = votingList))
  }

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
    this.dialogService
      .getResponse('¿Seguro que quieres hacer un reset? Esto borrara todas las votaciones de la BD')
      .subscribe(response => {
        if (!response) return
        if (this.votingService.resetVoting()) this.snackBarService.openSnackBar('Votación(es) eliminada con éxito')
        else this.snackBarService.openSnackBar('Debes finalizar las votaciones activas antes de poder eliminarlas')
      })
  }

  ngOnDestroy(): void {
    this.votingListSubscription.unsubscribe()
  }

  constructor(
    private votingService: VotingService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService
  ) {
    this.votingList = []
    this.votingListSubscription = new Subscription()
    this.subscribeToVotingList()
  }
}
