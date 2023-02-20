import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VotingCreationFormComponent } from './voting-creation-form.component'

describe('VotingFormComponent', () => {
  let component: VotingCreationFormComponent
  let fixture: ComponentFixture<VotingCreationFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingCreationFormComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(VotingCreationFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
