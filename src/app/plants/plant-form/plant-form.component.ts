import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Plant } from '../plant.interface';

interface DialogData {
  plant: Plant | null;
}

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.css']
})

export class PlantFormComponent {
  form: FormGroup;
  plant: Plant | null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PlantFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.plant = data.plant;
    this.form = this.fb.group({
      name: [this.plant ? this.plant.name : '', Validators.required],
      family: [this.plant ? this.plant.family : '', Validators.required],
      year: [this.plant ? this.plant.year : '', Validators.required],
      slug: [this.plant ? this.plant.slug : '', Validators.required],
      image: [this.plant ? this.plant.image : '']
    });
  }

  onSubmit() {
    const newPlant: Plant = {
      id: this.plant ? this.plant.id : 0,
      ...this.form.value
    };

    this.dialogRef.close(newPlant);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
