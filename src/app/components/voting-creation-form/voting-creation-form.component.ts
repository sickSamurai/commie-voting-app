import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { VotingCreationForm } from 'src/app/models/VotingCreationForm'

import { VotingService } from '../../services/voting.service'
import {
  numberOfCandidatesValidator,
  numberOfWinnersValidator
} from '../../validators/voting-creation-form-validators'

@Component({
  selector: 'app-voting-creation-form',
  templateUrl: './voting-creation-form.component.html',
  styleUrls: ['./voting-creation-form.component.scss']
})
export class VotingCreationFormComponent {
  votingCreationForm: FormGroup<VotingCreationForm>
  @Output() votingCreated = new EventEmitter()

  onVotingCreation() {
    if (this.votingCreationForm.invalid) return
    this.votingService.setVotingName(this.votingCreationForm.controls.name.value)
    this.votingService.setNumberOfCandidates(this.votingCreationForm.controls.numberOfCandidates.value)
    this.votingService.setNumberOfWinners(this.votingCreationForm.controls.numberOfWinners.value)
    this.votingService.setPeopleInCensus(this.votingCreationForm.controls.peopleInCensus.value)
    this.votingCreated.emit()
  }

  getFormControlError(formControl: FormControl, min?: number) {
    if (!formControl.errors) return null
    else if (formControl.errors['required']) return 'Campo Requerido'
    else if (formControl.errors['min']) return `El valor mínimo es ${min}`
    else if (formControl.errors['max']) return 'Sobrepasaste el valor máximo'
    else return 'Error desconocido'
  }

  subscribeToPeopleInCensusValueChanges() {
    this.votingCreationForm.controls.peopleInCensus.valueChanges.subscribe({
      next: () => {
        this.votingCreationForm.controls.numberOfCandidates.updateValueAndValidity()
        this.votingCreationForm.controls.numberOfWinners.updateValueAndValidity()
      }
    })
  }

  subscribeToNumberOfCandidatesValueChanges() {
    this.votingCreationForm.controls.numberOfCandidates.valueChanges.subscribe({
      next: () => this.votingCreationForm.controls.numberOfWinners.updateValueAndValidity()
    })
  }

  constructor(private votingService: VotingService) {
    this.votingCreationForm = new FormGroup(<VotingCreationForm>{
      name: new FormControl('', Validators.required),
      peopleInCensus: new FormControl(0, [Validators.required, Validators.min(3)]),
      numberOfCandidates: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        numberOfCandidatesValidator()
      ]),
      numberOfWinners: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        numberOfWinnersValidator()
      ])
    })
    this.subscribeToPeopleInCensusValueChanges()
    this.subscribeToNumberOfCandidatesValueChanges()
  }
}
