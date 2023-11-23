import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctmSearchComponent } from './acctm-search.component';

describe('AcctmSearchComponent', () => {
  let component: AcctmSearchComponent;
  let fixture: ComponentFixture<AcctmSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcctmSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AcctmSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
