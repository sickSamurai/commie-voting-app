import { Component, EventEmitter, OnDestroy, Output } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { Candidate } from 'src/app/models/Candidate'

import { VotingService } from '../../../services/voting.service'
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component'

type FormMode = 'creation' | 'edition'

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.scss']
})
export class CandidatesFormComponent implements OnDestroy {
  @Output() votingCreated = new EventEmitter()
  votingName = ''
  remainingCandidates = 0
  candidates: Array<Candidate> = []
  numberOfCandidatesSubscription = new Subscription()
  votingNameSubscription = new Subscription()
  nameFormControl = new FormControl('', Validators.required)
  mode: FormMode = 'creation'
  candidateToEditIndex = 0

  saveData() {
    if (this.mode === 'creation') this.addCandidate()
    else this.editCandidate()
    this.setupCreationMode()
  }

  addCandidate() {
    if (this.nameFormControl.valid && this.remainingCandidates > 0) {
      this.candidates.push({ name: this.nameFormControl.value || 'null', votes: 0 })
      this.remainingCandidates -= 1
    }
  }

  editCandidate() {
    if (this.nameFormControl.invalid) return
    this.candidates[this.candidateToEditIndex].name = this.nameFormControl.value || 'null'
  }

  saveAllCandidates() {
    this.votingService.setCandidates(this.candidates)
    this.votingService.addVoting()
    this.votingCreated.emit()
    this.openConfirmationSnackbar()
  }

  get candidateFormTitle() {
    return this.creationModeActivated
      ? `Agrega un candidato/a para la votación "${this.votingName}"`
      : 'Edita el candidato/a'
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

  get creationModeActivated() {
    return this.mode === 'creation'
  }

  get thereAreCandidates() {
    return this.remainingCandidates != 0
  }

  setupCreationMode() {
    this.mode = 'creation'
    this.nameFormControl.reset('')
  }

  setupEditMode(name: string) {
    this.mode = 'edition'
    this.nameFormControl.setValue(name)
    this.candidateToEditIndex = this.candidates.findIndex(candidate => candidate.name === name)
  }

  openConfirmationSnackbar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: 'Votación añadida con éxito'
    })
  }

  ngOnDestroy(): void {
    this.numberOfCandidatesSubscription.unsubscribe()
    this.votingNameSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService, private snackBar: MatSnackBar) {
    this.numberOfCandidatesSubscription = this.votingService.getNumberOfCandidates().subscribe({
      next: value => (this.remainingCandidates = value)
    })

    this.votingNameSubscription = this.votingService.getVotingName().subscribe({
      next: value => (this.votingName = value)
    })
  }
}
