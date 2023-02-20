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
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.candidates.includes(control.value)) return { repeatedName: true }
      else return null
    }
  }

  numberOfWinnersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const numberOfCandidatesFormControl = control.parent?.get('numberOfCandidates')
      if (!numberOfCandidatesFormControl) return null
      const numberOfCandidates = +numberOfCandidatesFormControl.value
      const numberOfWinners = +control.value
      return numberOfWinners < numberOfCandidates ? null : { max: true }
    }
  }

  constructor(private votingService: VotingService) {
    this.candidates = []
    this.subscribeToCandidatesChanges()
  }
}
