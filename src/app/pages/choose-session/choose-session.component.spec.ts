import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSessionComponent } from './choose-session.component';

describe('ChooseSessionComponent', () => {
  let component: ChooseSessionComponent;
  let fixture: ComponentFixture<ChooseSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
