import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { By } from '@angular/platform-browser';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();
  });
  
  beforeEach( async () => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit nextPage event when onNextPage is called and not on the last page', () => {
    spyOn(component.nextPage, 'emit');
    component.totalItems = 20; // Ensure it's not the last page
    component.onNextPage();
    expect(component.nextPage.emit).toHaveBeenCalled();
});
  
it('should emit prevPage event when onPrevPage is called and not on the first page', () => {
  spyOn(component.prevPage, 'emit');
  component.currentPage = 2; // Ensure it's not the first page
  component.onPrevPage();
  expect(component.prevPage.emit).toHaveBeenCalled();
});

});
