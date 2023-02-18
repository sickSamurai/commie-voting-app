import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { VotingDTO } from 'src/app/models/VotingDTO'
import { VotingService } from 'src/app/services/voting.service'

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

  vote() {
    this.currentVoting.candidates.forEach(candidate => {
      const wasVoted = this.currentVotingForm.get(candidate.name)?.value
      candidate.votes += wasVoted ? 1 : 0
    })
    console.log(this.currentVoting.candidates)
    if (this.currentVotingPage < this.votingList.length) this.currentVotingPage++
  }

  subscribeToVotingList() {
    this.votingListSubscription = this.votingService.getVotingList().subscribe(list => {
      this.votingList = list
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

  ngOnDestroy(): void {
    this.votingListSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService) {
    this.votingForms = []
    this.votingList = []
    this.votingListSubscription = new Subscription()
    this.subscribeToVotingList()
  }
}
