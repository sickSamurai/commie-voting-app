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
  peopleInCensusSubscription: Subscription
  votingForms: FormGroup[]
  currentVotingPage = 1
  remainingVotes = 0

  get currentVoting() {
    return this.votingList[this.currentVotingPage - 1]
  }

  get currentVotingForm() {
    return this.votingForms[this.currentVotingPage - 1]
  }

  vote() {
    if (this.remainingVotes <= 0) return
    this.currentVoting.candidates.forEach(candidate => {
      candidate.votes += this.currentVotingForm.get(candidate.name)?.value ? 1 : 0
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

  subscribeToPeopleInCensus() {
    this.votingService.getPeopleInCensus().subscribe(peopleInCensus => (this.remainingVotes = peopleInCensus))
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
    this.peopleInCensusSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService) {
    this.votingForms = []
    this.votingList = []
    this.votingListSubscription = new Subscription()
    this.peopleInCensusSubscription = new Subscription()
    this.subscribeToVotingList()
    this.subscribeToPeopleInCensus()
  }
}
