import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function numberOfCandidatesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const peopleInCensusFormControl = control.parent?.get('peopleInCensus')
    if (!peopleInCensusFormControl) return null
    const peopleInCensus = +peopleInCensusFormControl.value
    const numberOfCandidates = +control.value
    return numberOfCandidates < peopleInCensus ? null : { max: true }
  }
}

export function numberOfWinnersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const numberOfCandidatesFormControl = control.parent?.get('numberOfCandidates')
    if (!numberOfCandidatesFormControl) return null
    const numberOfCandidates = +numberOfCandidatesFormControl.value
    const numberOfWinners = +control.value
    return numberOfWinners < numberOfCandidates ? null : { max: true }
  }
}
