import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantFormComponent } from './plant-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('PlantFormComponent', () => {
  let component: PlantFormComponent;
  let fixture: ComponentFixture<PlantFormComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  const mockPlant = {
    _id: '1',
    name: 'Test Plant',
    family: 'Testaceae',
    year: 2020,
    slug: 'test-plant',
    image: 'test.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule],
      declarations: [PlantFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { plant: mockPlant } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockDialogRef.close.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form if plant data is provided', () => {
    const expectedFormData = {
        name: mockPlant.name,
        family: mockPlant.family,
        year: mockPlant.year,
        slug: mockPlant.slug,
        image: mockPlant.image
    };
    expect(component.form.value).toEqual(expectedFormData);
});

  it('should have default validation rules', () => {
    expect(component.form.get('name')?.valid).toBeTrue();
    component.form.get('name')?.setValue('');
    expect(component.form.get('name')?.valid).toBeFalse();
  });

  it('should close dialog with plant data if form is valid', () => {
    component.onSubmit();
    const expectedData = {
        name: mockPlant.name,
        family: mockPlant.family,
        year: mockPlant.year,
        slug: mockPlant.slug,
        image: mockPlant.image
    };
    expect(mockDialogRef.close).toHaveBeenCalledWith(expectedData);
});

  it('should close dialog without emitting data on closeDialog', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });
});
