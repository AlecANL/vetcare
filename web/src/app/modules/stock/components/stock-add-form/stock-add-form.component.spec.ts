import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAddFormComponent } from './stock-add-form.component';

describe('StockAddFormComponent', () => {
  let component: StockAddFormComponent;
  let fixture: ComponentFixture<StockAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
