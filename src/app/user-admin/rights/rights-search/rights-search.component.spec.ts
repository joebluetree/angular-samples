import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsSearchComponent } from './rights-search.component';

describe('ModuleSearchComponent', () => {
  let component: RightsSearchComponent;
  let fixture: ComponentFixture<RightsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightsSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RightsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
