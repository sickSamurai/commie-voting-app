import { Component, EventEmitter, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
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

  get nameError() {
    const nameControl = this.votingCreationForm.controls.name
    if (!nameControl.errors) return null
    else if (nameControl.errors['required']) return 'Campo Requerido'
    else if (nameControl.errors['repeatedName']) return 'Esa votación ya existe'
    else return 'Error desconocido'
  }

  get numberOfCandidatesError() {
    const numberOfCandidatesControl = this.votingCreationForm.controls.numberOfCandidates
    if (!numberOfCandidatesControl.errors) return null
    else if (numberOfCandidatesControl.errors['required']) return 'Campo requerido'
    else if (numberOfCandidatesControl.errors['min']) return 'El valor mínimo es 2'
    else return 'Error Desconocido'
  }

  get numberOfWinnersError() {
    const numberOfWinnersControl = this.votingCreationForm.controls.numberOfWinners
    if (!numberOfWinnersControl.errors) return null
    else if (numberOfWinnersControl.errors['required']) return 'Campo requerido'
    else if (numberOfWinnersControl.errors['min']) return 'El valor mínimo es 1'
    else if (numberOfWinnersControl.errors['numberOfWinners'])
      return 'El numero de personas a elegir no puede ser mayor a la cantidad de candidatos'
    else return 'Error Desconocido'
  }

  onVotingCreation() {
    const { name, numberOfCandidates, numberOfWinners } = this.votingCreationForm.value
    if (!name || !numberOfCandidates || !numberOfWinners || this.votingCreationForm.invalid) return
    this.votingService.setVotingName(name)
    this.votingService.setNumberOfCandidates(numberOfCandidates)
    this.votingService.setNumberOfWinners(numberOfWinners)
    this.votingCreated.emit()
  }

  subscribeToChangesInNumberOfCandidates() {
    this.votingCreationForm.controls.numberOfCandidates.valueChanges.subscribe({
      next: () => this.votingCreationForm.controls.numberOfWinners.updateValueAndValidity()
    })
  }

  constructor(private votingService: VotingService, private formService: VotingCreationFormService) {
    this.votingCreationForm = new FormGroup(new VotingCreationForm(this.formService))
    this.subscribeToChangesInNumberOfCandidates()
  }
}
