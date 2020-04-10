import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationPieChartComponent } from './utilization-pie-chart.component';

describe('UtilizationPieChartComponent', () => {
  let component: UtilizationPieChartComponent;
  let fixture: ComponentFixture<UtilizationPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
