import { Component, OnDestroy } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Candidate } from 'src/app/models/Candidate'

import { VotingService } from '../../services/voting.service'

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.scss']
})
export class CandidatesFormComponent implements OnDestroy {
  votingName = ''
  candidates: Array<Candidate> = []
  remainingCandidates = 0
  numberOfCandidatesSubscription = new Subscription()
  votingNameSubscription = new Subscription()
  nameFormControl = new FormControl('', Validators.required)

  addCandidate() {
    if (this.nameFormControl.valid && this.remainingCandidates > 0) {
      this.candidates.push({ name: this.nameFormControl.value || 'null', votes: 0 })
      this.remainingCandidates -= 1
      this.nameFormControl.reset()
      this.nameFormControl.markAsUntouched()
    }
  }

  saveAllCandidates() {
    this.votingService.setCandidates(this.candidates)
  }

  get remainingCandidatesText() {
    if (this.remainingCandidates === 0) {
      return 'No hay más candidatos para guardar'
    } else if (this.remainingCandidates === 1) {
      return 'Queda un candidato'
    } else return `Quedan ${this.remainingCandidates} candidatos`
  }

  ngOnDestroy(): void {
    this.numberOfCandidatesSubscription.unsubscribe()
    this.votingNameSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService) {
    this.numberOfCandidatesSubscription = this.votingService.getNumberOfCandidates().subscribe({
      next: value => (this.remainingCandidates = value)
    })

    this.votingNameSubscription = this.votingService.getVotingName().subscribe({
      next: value => (this.votingName = value)
    })
  }
}
