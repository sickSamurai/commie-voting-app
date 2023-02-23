import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Candidate } from 'src/app/models/Candidate'
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
  votingStatus: VotingStatus
  votingListSubscription: Subscription
  votingStatusSubscription: Subscription

  get currentVoting() {
    return this.votingList.at(this.currentVotingPage - 1)
  }

  get currentVotingForm() {
    return this.votingForms.at(this.currentVotingPage - 1)
  }

  get maxVotesMessage() {
    if (this.currentVoting === undefined) throw new Error('current voting is undefined')
    if (this.currentVoting.numberOfWinners == 1) return 'Recuerda que solo puedes votar por 1 persona'
    return `Recuerda que puedes votar por máximo ${this.currentVoting.numberOfWinners} personas`
  }

  getCandidateVote(candidate: Candidate) {
    if (this.currentVotingForm === undefined) throw new Error('current form is undefined')
    return +this.currentVotingForm.get(candidate.name)?.value
  }

  get currentVotes() {
    if (this.currentVoting === undefined) throw new Error('current voting is undefined')
    return this.currentVoting.candidates
      .map<number>(candidate => this.getCandidateVote(candidate))
      .reduce((previous, current) => previous + current)
  }

  get remainingVotes() {
    if (this.currentVoting === undefined || this.currentVotes === undefined)
      throw new Error('current voting or current votes are undefined')
    return this.currentVoting.numberOfWinners - this.currentVotes
  }

  get remainingVotesMessage() {
    if (this.remainingVotes == 1) return 'Te queda 1 voto'
    if (this.remainingVotes == 0) return 'No te quedan más votos'
    if (this.remainingVotes == -1) return `Debes quitar 1 voto`
    if (this.remainingVotes < -1) return `Debes quitar ${-this.remainingVotes} votos`
    return `Te quedan ${this.remainingVotes} votos`
  }

  goNextVoting() {
    if (this.currentVotingForm === undefined) throw new Error('current voting form is undefined')
    if (this.currentVotingPage < this.votingList.length) {
      this.currentVotingPage++
    } else {
      this.currentVotingPage = 1
      this.currentVotingForm.reset()
    }
  }

  vote() {
    if (this.currentVoting === undefined) throw new Error('current voting is undefined')
    this.currentVoting.candidates.forEach(candidate => (candidate.votes += this.getCandidateVote(candidate)))
    this.votingService.updateVoting(this.currentVoting)
    this.snackBarService.openSnackBar('Votación Exitosa')
    this.goNextVoting()
  }

  generateVotingForms() {
    this.votingForms.splice(0, this.votingList.length) //delete all elements from the array
    this.votingList.forEach(voting => {
      const formGroup = new FormGroup({})
      voting.candidates.forEach(candidate => formGroup.addControl(candidate.name, new FormControl(false)))
      this.votingForms.push(formGroup)
    })
  }

  subscribeToVotingList() {
    this.votingListSubscription = this.votingService.getVotingList().subscribe(votingList => {
      this.votingList = votingList
      this.generateVotingForms()
    })
  }

  subscribeToVotingStatus() {
    this.votingStatusSubscription = this.votingService
      .getVotingStatus()
      .subscribe(status => (this.votingStatus = status))
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
    this.subscribeToVotingStatus()
    this.subscribeToVotingList()
  }
}
