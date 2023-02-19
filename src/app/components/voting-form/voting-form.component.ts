import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { VotingDTO } from 'src/app/models/VotingDTO'
import { VotingService } from 'src/app/services/voting.service'

import { SnackBarComponent } from '../snack-bar/snack-bar.component'

@Component({
  selector: 'app-voting-form',
  templateUrl: './voting-form.component.html',
  styleUrls: ['./voting-form.component.scss']
})
export class VotingFormComponent {
  votingList: VotingDTO[]
  votingListSubscription: Subscription
  votingForms: FormGroup[]
  currentVotingPage = 1

  get currentVoting() {
    return this.votingList[this.currentVotingPage - 1]
  }

  get currentVotingForm() {
    return this.votingForms[this.currentVotingPage - 1]
  }

  goNextVoting() {
    if (this.currentVotingPage < this.votingList.length) this.currentVotingPage++
    else this.currentVotingPage = 1
  }

  vote() {
    if (this.currentVoting.peopleInCensus <= 0) return
    this.currentVoting.candidates.forEach(candidate => {
      candidate.votes += this.currentVotingForm.get(candidate.name)?.value ? 1 : 0
    })
    console.log(this.currentVoting.candidates)
    this.currentVoting.peopleInCensus -= 1
    this.openConfirmationSnackBar()
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
    this.votingForms = []
    this.votingList = []
    this.votingListSubscription = new Subscription()
    this.subscribeToVotingList()
  }
}
