import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUtilizationComponent } from './dashboard-utilization.component';

describe('DashboardUtilizationComponent', () => {
  let component: DashboardUtilizationComponent;
  let fixture: ComponentFixture<DashboardUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUtilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
