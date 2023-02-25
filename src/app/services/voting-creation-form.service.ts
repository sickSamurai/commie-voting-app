import { Injectable } from '@angular/core'
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

import { VotingService } from './voting.service'

@Injectable({
  providedIn: 'root'
})
export class VotingCreationFormService {
  candidates: string[]

  subscribeToCandidatesChanges() {
    this.votingService
      .getCandidates()
      .subscribe(candidates => (this.candidates = candidates.map(candidate => candidate.name)))
  }

  repeatedNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.candidates.includes(control.value) ? { repeatedName: true } : null
  }

  numberOfWinnersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const numberOfCandidates = +control.parent?.get('numberOfCandidates')?.value
      const numberOfWinners = +control.value
      return numberOfCandidates <= numberOfWinners ? { numberOfWinners: true } : null
    }
  }

  constructor(private votingService: VotingService) {
    this.candidates = []
    this.subscribeToCandidatesChanges()
  }
}
