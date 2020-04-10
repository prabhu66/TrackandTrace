import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnAssetsComponent } from './return-assets.component';

describe('ReturnAssetsComponent', () => {
  let component: ReturnAssetsComponent;
  let fixture: ComponentFixture<ReturnAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
