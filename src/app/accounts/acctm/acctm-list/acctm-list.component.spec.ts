import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctmListComponent } from './acctm-list.component';

describe('AcctmListComponent', () => {
  let component: AcctmListComponent;
  let fixture: ComponentFixture<AcctmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcctmListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AcctmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
