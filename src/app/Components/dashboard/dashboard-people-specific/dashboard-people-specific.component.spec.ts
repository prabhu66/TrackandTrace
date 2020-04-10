import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPeopleSpecificComponent } from './dashboard-people-specific.component';

describe('DashboardPeopleSpecificComponent', () => {
  let component: DashboardPeopleSpecificComponent;
  let fixture: ComponentFixture<DashboardPeopleSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPeopleSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPeopleSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
