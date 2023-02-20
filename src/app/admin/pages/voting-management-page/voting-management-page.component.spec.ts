import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VotingManagementPageComponent } from './voting-management-page.component'

describe('VotingGestionPageComponent', () => {
  let component: VotingManagementPageComponent
  let fixture: ComponentFixture<VotingManagementPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingManagementPageComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(VotingManagementPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
