import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { VotingStatus } from 'src/app/models/VotingStatus'
import { VotingService } from 'src/app/services/voting.service'

import { VotingDTO } from '../../models/VotingDTO'
import { SnackBarService } from '../../services/snack-bar.service'

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
  votingStatusSubscription: Subscription
  votingStatus: VotingStatus

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

  subscribeToVotingList() {
    this.votingListSubscription = this.votingService.getVotingList().subscribe(votingList => {
      this.votingList = votingList
      this.generateVotingForms()
    })
  }

  subscribeToVotingStatus() {
    this.votingStatusSubscription = this.votingService.getVotingStatus().subscribe(votingStatus => {
      this.votingStatus = votingStatus
    })
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
    this.snackBarService.openSnackBar('Votación Exitosa')
    this.currentVotingForm.reset()
    this.goNextVoting()
  }

  generateVotingForms() {
    this.votingList.forEach(voting => {
      this.votingForms.splice(0, this.votingList.length) //delete all elements from the array
      const formGroup = new FormGroup({})
      voting.candidates.forEach(candidate => formGroup.addControl(candidate.name, new FormControl(false)))
      this.votingForms.push(formGroup)
    })
  }

  ngOnDestroy(): void {
    this.votingListSubscription.unsubscribe()
    this.votingStatusSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService, private snackBarService: SnackBarService) {
    this.votingList = []
    this.votingForms = []
    this.votingStatus = 'undefined'
    this.votingListSubscription = new Subscription()
    this.votingStatusSubscription = new Subscription()
    this.subscribeToVotingList()
    this.subscribeToVotingStatus()
  }
}
