import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Specialization } from 'src/app/models/entities';
import { CourseService } from 'src/app/services/course.service';

@Component({
    selector: 'app-copy-course-modal',
    templateUrl: './copy-course-modal.component.html',
    styleUrls: ['./copy-course-modal.component.css'],
})
export class CopyCourseModalComponent {
    @Input() mapSpecializations!: Map<string, Specialization>;
    @Input() isOpen!: boolean;
    @Output() closed = new EventEmitter<boolean>();
    isLoading = false;
    selectedSpecialization?: Specialization;
    promotionForm: FormGroup;
    dayCopyForm: FormGroup;
    weekCopyForm: FormGroup;
    copyOption: 'day' | 'week' = 'day';
    searchText: string = '';
    filteredSpecializations: Array<{ key: string; value: Specialization }> = [];
    numberOfResults: number = 0;

    constructor(private fb: FormBuilder, private courseService: CourseService) {
        this.promotionForm = this.fb.group({
            promotion: ['', Validators.required],
            department_id: ['', Validators.required],
        });
        this.dayCopyForm = this.fb.group({
            day_to_copy: ['', Validators.required],
            day_to_paste: ['', Validators.required],
        });
        this.weekCopyForm = this.fb.group({
            week_to_copy_start: ['', Validators.required],
            week_to_paste_start: ['', Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['isOpen'].currentValue === true) {
            this.onSearchChange(this.searchText);
        }
    }

    get promotionControl(): FormControl {
        return this.promotionForm.get('promotion') as FormControl;
    }

    get departmentIdControl(): FormControl {
        return this.promotionForm.get('department_id') as FormControl;
    }

    get dayToCopyControl(): FormControl {
        return this.dayCopyForm.get('day_to_copy') as FormControl;
    }

    get dayToPasteControl(): FormControl {
        return this.dayCopyForm.get('day_to_paste') as FormControl;
    }

    get weekToCopyControl(): FormControl {
        return this.weekCopyForm.get('week_to_copy_start') as FormControl;
    }

    get weekToPasteControl(): FormControl {
        return this.weekCopyForm.get('week_to_paste_start') as FormControl;
    }

    isSelected(value: Specialization): boolean {
        return this.selectedSpecialization?.id === value?.id;
    }

    selectSpecialization(value: Specialization) {
        this.selectedSpecialization = value;
        this.promotionControl.setValue(value.id);
        this.departmentIdControl.setValue(value.department_id);
    }

    onSearchChange(searchText: string): void {
        this.searchText = searchText.toLowerCase();
        this.filteredSpecializations = this.filterMap(this.mapSpecializations, this.searchText);
        this.updateNumberOfResults();
    }

    updateNumberOfResults(): void {
        this.numberOfResults = this.filteredSpecializations.length;
    }

    submit() {
        this.isLoading = true;

        const isDayFormValid = this.copyOption === 'day' ? this.dayCopyForm.valid : true;
        const isWeekFormValid = this.copyOption === 'week' ? this.weekCopyForm.valid : true;

        if (this.promotionForm.valid && isDayFormValid && isWeekFormValid) {
            const combinedFormData = {
                ...this.promotionForm.value,
                ...(this.copyOption === 'day' ? this.dayCopyForm.value : this.weekCopyForm.value),
            };

            this.courseService
                .copyCourse(this.copyOption, combinedFormData)
                .then((response) => {
                    this.isLoading = false;
                    this.resetForms();
                    this.close(true);
                })
                .catch((error) => {
                    console.log(error);
                    this.isLoading = false;
                });
        } else {
            if (this.copyOption === 'day') {
                this.dayCopyForm.markAllAsTouched();
            } else {
                this.weekCopyForm.markAllAsTouched();
            }
        }
    }

    close(reload: boolean = false) {
        this.closed.emit(reload);
    }

    private filterMap(map: Map<string, Specialization>, searchText: string): Array<{ key: string; value: Specialization }> {
        const filtered = Array.from(map)
            .filter(([key, value]) => !searchText || value.getSearchValue().toLowerCase().includes(searchText))
            .map(([key, value]) => ({ key, value }));
        return filtered;
    }

    private resetForms() {
        this.selectedSpecialization = undefined;
        this.copyOption = 'day';
        this.searchText = '';
        this.promotionForm.reset();
        this.dayCopyForm.reset();
        this.weekCopyForm.reset();
    }
}
