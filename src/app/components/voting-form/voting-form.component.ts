import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { VotingForm } from 'src/app/models/VotingForm'

import { VotingService } from '../../services/voting.service'
import { numberOfCandidatesValidator, numberOfWinnersValidator } from '../../validators/voting-form-validators'

@Component({
  selector: 'app-voting-form',
  templateUrl: './voting-form.component.html',
  styleUrls: ['./voting-form.component.scss']
})
export class VotingFormComponent {
  votingForm: FormGroup<VotingForm>
  @Output() votingCreated = new EventEmitter()

  onVotingCreation() {
    if (this.votingForm.invalid) return
    this.votingService.setVotingName(this.votingForm.controls.name.value)
    this.votingService.setNumberOfCandidates(this.votingForm.controls.numberOfCandidates.value)
    this.votingService.setNumberOfWinners(this.votingForm.controls.numberOfWinners.value)
    this.votingService.setPeopleInCensus(this.votingForm.controls.peopleInCensus.value)
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
    this.votingForm.controls.peopleInCensus.valueChanges.subscribe({
      next: () => {
        this.votingForm.controls.numberOfCandidates.updateValueAndValidity()
        this.votingForm.controls.numberOfWinners.updateValueAndValidity()
      }
    })
  }

  constructor(private votingService: VotingService) {
    this.votingForm = new FormGroup(<VotingForm>{
      name: new FormControl('', Validators.required),
      numberOfCandidates: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        numberOfCandidatesValidator()
      ]),
      numberOfWinners: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        numberOfWinnersValidator()
      ]),
      peopleInCensus: new FormControl(0, [Validators.required, Validators.min(3)])
    })
    this.subscribeToPeopleInCensusValueChanges()
  }
}
