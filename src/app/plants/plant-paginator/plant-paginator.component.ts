import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-plant-paginator',
  templateUrl: './plant-paginator.component.html',
  styleUrls: ['./plant-paginator.component.scss']
})
export class PlantPaginatorComponent {

  @Input() totalPlants = 0;
  @Input() plantsPerPage = 10;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();

  get totalPages(): number {
    return Math.ceil(this.totalPlants / this.plantsPerPage);
  }

  isLastPage(): boolean {
    return this.totalPlants < this.plantsPerPage
  }

  onNextPage(): void {
    this.currentPage++;
    this.nextPage.emit();
  }

  onPrevPage(): void {
    this.currentPage--;
    this.prevPage.emit();
  }
}
