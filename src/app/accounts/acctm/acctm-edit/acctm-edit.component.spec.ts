import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctmEditComponent } from './acctm-edit.component';

describe('AcctmEditComponent', () => {
  let component: AcctmEditComponent;
  let fixture: ComponentFixture<AcctmEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcctmEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AcctmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
