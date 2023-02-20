import { Component, EventEmitter, OnDestroy, Output } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Candidate } from 'src/app/models/Candidate'

import { SnackBarService } from '../../../services/snack-bar.service'
import { VotingService } from '../../../services/voting.service'

type FormMode = 'creation' | 'edition'

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.scss']
})
export class CandidatesFormComponent implements OnDestroy {
  @Output() votingCreated = new EventEmitter()
  remainingCandidates = 0
  candidates: Array<Candidate> = []
  numberOfCandidatesSubscription = new Subscription()
  nameFormControl = new FormControl('', Validators.required)
  mode: FormMode = 'creation'
  candidateToEditIndex = 0

  setupCreationMode() {
    this.mode = 'creation'
    this.nameFormControl.reset('')
  }

  setupEditMode(name: string) {
    this.mode = 'edition'
    this.nameFormControl.setValue(name)
    this.candidateToEditIndex = this.candidates.findIndex(candidate => candidate.name === name)
  }

  addCandidate() {
    if (this.nameFormControl.invalid) return
    this.candidates.push({ name: this.nameFormControl.value || 'null', votes: 0 })
    this.remainingCandidates -= 1
  }

  editCandidate() {
    if (this.nameFormControl.invalid) return
    this.candidates[this.candidateToEditIndex].name = this.nameFormControl.value || 'null'
  }

  saveCandidate() {
    this.mode === 'creation' ? this.addCandidate() : this.editCandidate()
    this.setupCreationMode()
  }

  saveAllCandidates() {
    this.votingService.setCandidates(this.candidates)
    this.votingService.addVoting()
    this.votingCreated.emit()
    this.snackBarService.openSnackBar('Votación añadida con éxito')
  }

  get creationModeActivated() {
    return this.mode === 'creation'
  }

  get candidateFormTitle() {
    return this.creationModeActivated ? 'Agrega un candidato/a' : 'Edita el candidato/a'
  }

  get buttonText() {
    return this.creationModeActivated ? 'agregar' : 'editar'
  }

  get remainingCandidatesText() {
    if (this.remainingCandidates === 0) {
      return 'No hay más candidatos para guardar'
    } else if (this.remainingCandidates === 1) {
      return 'Queda un candidato'
    } else return `Quedan ${this.remainingCandidates} candidatos`
  }

  get thereAreCandidates() {
    return this.remainingCandidates != 0
  }

  ngOnDestroy(): void {
    this.numberOfCandidatesSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService, private snackBarService: SnackBarService) {
    this.numberOfCandidatesSubscription = this.votingService.getNumberOfCandidates().subscribe({
      next: value => (this.remainingCandidates = value)
    })
  }
}
