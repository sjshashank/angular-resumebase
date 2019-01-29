import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResumesComponent } from './all-resumes.component';

describe('AllResumesComponent', () => {
  let component: AllResumesComponent;
  let fixture: ComponentFixture<AllResumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllResumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
