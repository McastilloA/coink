import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoFoundPage } from './no-found.page';

describe('NoFoundPage', () => {
  let component: NoFoundPage;
  let fixture: ComponentFixture<NoFoundPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(NoFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
