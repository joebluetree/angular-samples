import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccGroupSearchComponent } from './accgroup-search.component';

describe('CompanySearchComponent', () => {
  let component: AccGroupSearchComponent;
  let fixture: ComponentFixture<AccGroupSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccGroupSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccGroupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
