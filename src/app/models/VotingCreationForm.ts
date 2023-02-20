import { FormControl, Validators } from '@angular/forms'

import { VotingCreationFormService } from '../services/voting-creation-form.service'

export class VotingCreationForm {
  name: FormControl<string | null>
  numberOfCandidates: FormControl<number | null>
  numberOfWinners: FormControl<number | null>

  constructor(formService: VotingCreationFormService) {
    this.name = new FormControl('', [Validators.required, formService.repeatedNameValidator()])
    this.numberOfCandidates = new FormControl(0, [Validators.required, Validators.min(2)])
    this.numberOfWinners = new FormControl(0, [
      Validators.required,
      Validators.min(1),
      formService.numberOfWinnersValidator()
    ])
  }
}
