import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGatewaysComponent } from './create-gateways.component';

describe('CreateGatewaysComponent', () => {
  let component: CreateGatewaysComponent;
  let fixture: ComponentFixture<CreateGatewaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGatewaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
