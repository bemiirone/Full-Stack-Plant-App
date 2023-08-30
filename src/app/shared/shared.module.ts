import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [ConfirmationDialogComponent, PaginatorComponent],
  exports: [PaginatorComponent],
})
export class SharedModule { }
