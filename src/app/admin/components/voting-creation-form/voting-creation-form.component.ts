import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { VotingCreationForm } from 'src/app/models/VotingCreationForm'

import { VotingCreationFormService } from '../../../services/voting-creation-form.service'
import { VotingService } from '../../../services/voting.service'

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
    this.votingCreated.emit()
  }

  getFormControlError(formControl: FormControl, min?: number) {
    if (!formControl.errors) return null
    else if (formControl.errors['required']) return 'Campo Requerido'
    else if (formControl.errors['min']) return `El valor mínimo es ${min}`
    else if (formControl.errors['max']) return 'Sobrepasaste el valor máximo'
    else if (formControl.errors['repeatedName']) return 'Esa votación ya existe'
    else return 'Error desconocido'
  }

  subscribeToNumberOfCandidatesValueChanges() {
    this.votingCreationForm.controls.numberOfCandidates.valueChanges.subscribe({
      next: () => this.votingCreationForm.controls.numberOfWinners.updateValueAndValidity()
    })
  }

  constructor(private votingService: VotingService, private formService: VotingCreationFormService) {
    this.votingCreationForm = new FormGroup(<VotingCreationForm>{
      name: new FormControl('', [Validators.required, this.formService.repeatedNameValidator()]),
      numberOfCandidates: new FormControl(0, [Validators.required, Validators.min(1)]),
      numberOfWinners: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        this.formService.numberOfWinnersValidator()
      ])
    })
    this.subscribeToNumberOfCandidatesValueChanges()
  }
}
