import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { VotingService } from 'src/app/services/voting.service'
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component'

import { VotingDTO } from '../../models/VotingDTO'

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnDestroy {
  currentVotingPage = 1
  votingList: VotingDTO[]
  votingForms: FormGroup[]
  votingListSubscription: Subscription

  get currentVoting() {
    return this.votingList[this.currentVotingPage - 1]
  }

  get currentVotingForm() {
    return this.votingForms[this.currentVotingPage - 1]
  }

  get currentVotes() {
    return this.currentVoting.candidates
      .map<number>(candidate => +this.currentVotingForm.get(candidate.name)?.value)
      .reduce((previous, current) => previous + current)
  }

  get votingIsValid() {
    return this.currentVoting.numberOfWinners >= this.currentVotes
  }

  get maxVotesMessage() {
    if (this.currentVoting.numberOfWinners == 1) return 'Recuerda que solo puedes votar por 1 persona'
    else return `Recuerda que puedes votar por máximo ${this.currentVoting.numberOfWinners} personas`
  }

  get remainingVotesMessage() {
    const remainingVotes = this.currentVoting.numberOfWinners - this.currentVotes

    if (remainingVotes == 1) return 'Te queda 1 voto'
    if (remainingVotes == 0) return 'No te quedan más votos'
    if (remainingVotes == -1) return `Debes quitar 1 voto`
    if (remainingVotes < -1) return `Debes quitar ${-remainingVotes} votos`
    return `Te quedan ${remainingVotes} votos`
  }

  goNextVoting() {
    if (this.currentVotingPage < this.votingList.length) this.currentVotingPage++
    else this.currentVotingPage = 1
  }

  vote() {
    this.currentVoting.candidates.forEach(candidate => {
      candidate.votes += +this.currentVotingForm.get(candidate.name)?.value
    })
    console.log(this.currentVoting.candidates)
    this.openConfirmationSnackBar()
    this.currentVotingForm.reset()
    this.goNextVoting()
  }

  subscribeToVotingList() {
    this.votingListSubscription = this.votingService.getVotingList().subscribe(votingList => {
      this.votingList = votingList
      this.generateVotingForms()
    })
  }

  generateVotingForms() {
    this.votingList.forEach(voting => {
      this.votingForms.splice(0, this.votingList.length) //delete all elements from the array
      const formGroup = new FormGroup({})
      voting.candidates.forEach(candidate => formGroup.addControl(candidate.name, new FormControl(false)))
      this.votingForms.push(formGroup)
    })
  }

  openConfirmationSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: 'Votación Exitosa'
    })
  }

  ngOnDestroy(): void {
    this.votingListSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService, private snackBar: MatSnackBar) {
    this.votingList = []
    this.votingForms = []
    this.votingListSubscription = new Subscription()
    this.subscribeToVotingList()
  }
}
