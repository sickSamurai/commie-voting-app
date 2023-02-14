import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { VotingForm } from 'src/app/models/VotingForm'

import { VotingService } from '../../services/voting.service'

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

  getFormControlError(formControl: FormControl) {
    if (!formControl.errors) return null
    else if (formControl.errors['required']) return 'Campo Requerido'
    else if (formControl.errors['min']) return 'El valor mínimo es 1'
    else return 'Error desconocido'
  }

  constructor(private votingService: VotingService) {
    this.votingForm = new FormGroup(<VotingForm>{
      name: new FormControl('', Validators.required),
      numberOfCandidates: new FormControl(0, [Validators.required, Validators.min(1)]),
      numberOfWinners: new FormControl(0, [Validators.required, Validators.min(1)]),
      peopleInCensus: new FormControl(0, [Validators.required, Validators.min(1)])
    })
  }
}
