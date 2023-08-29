import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-plant-paginator',
  templateUrl: './plant-paginator.component.html',
  styleUrls: ['./plant-paginator.component.css']
})
export class PlantPaginatorComponent {
  @Input() totalPlants: number = 0;
  @Input() plantsPerPage: number = 10;
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 1;
  showAll: boolean = false;

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  onNext(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  onShowAllToggle(): void {
    this.showAll = !this.showAll;
    this.pageChange.emit(this.showAll ? 0 : this.currentPage);
  }

  totalPages(): number {
    return Math.ceil(this.totalPlants / this.plantsPerPage);
  }
}

