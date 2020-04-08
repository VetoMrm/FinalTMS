import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldTicketComponent } from './hold-ticket.component';

describe('HoldTicketComponent', () => {
  let component: HoldTicketComponent;
  let fixture: ComponentFixture<HoldTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
