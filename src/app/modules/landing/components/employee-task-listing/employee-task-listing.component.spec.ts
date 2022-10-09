import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskListingComponent } from './employee-task-listing.component';

describe('EmployeeTaskListingComponent', () => {
  let component: EmployeeTaskListingComponent;
  let fixture: ComponentFixture<EmployeeTaskListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTaskListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTaskListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
