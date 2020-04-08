import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedTicketComponent } from './fixed-ticket.component';

describe('FixedTicketComponent', () => {
  let component: FixedTicketComponent;
  let fixture: ComponentFixture<FixedTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
