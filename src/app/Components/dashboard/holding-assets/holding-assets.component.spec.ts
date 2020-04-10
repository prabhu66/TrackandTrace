import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingAssetsComponent } from './holding-assets.component';

describe('HoldingAssetsComponent', () => {
  let component: HoldingAssetsComponent;
  let fixture: ComponentFixture<HoldingAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldingAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
