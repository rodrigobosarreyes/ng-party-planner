import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsDataviewComponent } from './guests-dataview.component';

describe('GuestsDataviewComponent', () => {
  let component: GuestsDataviewComponent;
  let fixture: ComponentFixture<GuestsDataviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestsDataviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestsDataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
