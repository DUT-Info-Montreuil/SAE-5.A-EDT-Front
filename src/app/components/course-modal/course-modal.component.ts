import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Personal, Room, Course, Teaching, SubGroup } from 'src/app/models/entities';
import { CourseType, FilterType } from 'src/app/models/enums';
import { CourseService } from 'src/app/services/course.service';

@Component({
    selector: 'app-course-modal',
    templateUrl: './course-modal.component.html',
    styleUrls: ['./course-modal.component.css'],
})
export class CourseModalComponent {
    @Input() mapPersonals!: Map<string, Personal>;
    @Input() mapRooms!: Map<string, Room>;
    @Input() mapTeachings!: Map<string, Teaching>;
    @Input() mapSubGroups!: Map<string, SubGroup>;
    @Input() isOpen!: boolean;
    @Output() closed = new EventEmitter<boolean>();
    FilterType = FilterType;
    isLoading: boolean = false;
    courseForm: FormGroup;
    courseRelationForm: FormGroup;
    currentStep: number = 1;
    course_types = Object.keys(CourseType).map((key) => ({ value: key, label: CourseType[key as keyof typeof CourseType] }));
    color_types = [
        { value: 'PURPLE', label: 'Violet', color: 'bg-calendar-purple' },
        { value: 'PINK', label: 'Rose', color: 'bg-calendar-pink' },
        { value: 'RED', label: 'Rouge', color: 'bg-calendar-red' },
        { value: 'BLUE', label: 'Bleu', color: 'bg-calendar-blue' },
    ];
    selectedTeaching?: Teaching;
    filterType?: FilterType = FilterType.Teaching;
    searchText: string = '';
    filteredTeachings: Array<{ key: string; value: Teaching }> = [];
    filteredPersonals: Array<{ key: string; value: Personal }> = [];
    filteredRooms: Array<{ key: string; value: Room }> = [];
    filteredSubGroups: Array<{ key: string; value: SubGroup }> = [];
    numberOfResults: number = 0;

    constructor(private fb: FormBuilder, private courseService: CourseService) {
        this.courseForm = this.fb.group(
            {
                description: ['', [Validators.required, Validators.minLength(3)]],
                date: ['', Validators.required],
                starttime: ['', Validators.required],
                endtime: ['', Validators.required],
                course_type: ['', Validators.required],
                color_type: ['', Validators.required],
            },
            { validator: this.startTimeBeforeEndTimeValidator }
        );

        this.courseRelationForm = this.fb.group({
            teaching_id: ['', Validators.required],
            personals: this.fb.array([]),
            rooms: this.fb.array([]),
            subGroups: this.fb.array([]),
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['isOpen'].currentValue === true) {
            this.onSearchChange(this.searchText);
        }
    }

    onSearchChange(searchText: string): void {
        this.searchText = searchText.toLowerCase();
        this.filteredTeachings = this.filterMap(this.mapTeachings, this.searchText);
        this.filteredPersonals = this.filterMap(this.mapPersonals, this.searchText);
        this.filteredRooms = this.filterMap(this.mapRooms, this.searchText);
        this.filteredSubGroups = this.filterMap(this.mapSubGroups, this.searchText);

        this.updateNumberOfResults();
    }

    get descriptionControl(): FormControl {
        return this.courseForm.get('description') as FormControl;
    }

    get dateControl(): FormControl {
        return this.courseForm.get('date') as FormControl;
    }

    get starttimeControl(): FormControl {
        return this.courseForm.get('starttime') as FormControl;
    }

    get endtimeControl(): FormControl {
        return this.courseForm.get('endtime') as FormControl;
    }

    get coursetypeControl(): FormControl {
        return this.courseForm.get('course_type') as FormControl;
    }

    get colortypeControl(): FormControl {
        return this.courseForm.get('color_type') as FormControl;
    }

    setActiveFilterType(filterType: FilterType) {
        this.filterType = filterType;
        this.updateNumberOfResults();
    }

    isSelectedTeaching(value: Teaching): boolean {
        return this.selectedTeaching === value;
    }

    selectTeaching(value: Teaching) {
        this.selectedTeaching = value;
        this.courseRelationForm.get('teaching_id')?.setValue(value.id);
    }

    toggleSelection(item: Personal | Room | SubGroup): void {
        let array: FormArray;

        if (item instanceof Personal) {
            array = this.courseRelationForm.get('personals') as FormArray;
        } else if (item instanceof Room) {
            array = this.courseRelationForm.get('rooms') as FormArray;
        } else if (item instanceof SubGroup) {
            array = this.courseRelationForm.get('subGroups') as FormArray;
        } else {
            throw new Error('Type non géré');
        }

        if (this.isSelected(item)) {
            const index = array.value.findIndex((x: any) => x.id === item.id);
            array.removeAt(index);
        } else {
            array.push(new FormControl(item));
        }
    }

    isSelected(item: Personal | Room | SubGroup): boolean {
        let array: FormArray;

        if (item instanceof Personal) {
            array = this.courseRelationForm.get('personals') as FormArray;
        } else if (item instanceof Room) {
            array = this.courseRelationForm.get('rooms') as FormArray;
        } else if (item instanceof SubGroup) {
            array = this.courseRelationForm.get('subGroups') as FormArray;
        } else {
            throw new Error('Type non géré');
        }

        return array.value.some((x: any) => x.id === item.id);
    }

    onNextStep() {
        if (this.currentStep === 1 && this.courseForm.valid) {
            this.currentStep++;
        } else {
            this.courseForm.markAllAsTouched();
        }
    }

    onBeforeStep() {
        this.currentStep--;
    }

    updateNumberOfResults(): void {
        switch (this.filterType) {
            case FilterType.Teaching:
                this.numberOfResults = this.filteredTeachings.length;
                break;
            case FilterType.Room:
                this.numberOfResults = this.filteredRooms.length;
                break;
            case FilterType.Personal:
                this.numberOfResults = this.filteredPersonals.length;
                break;
            case FilterType.SubGroup:
                this.numberOfResults = this.filteredSubGroups.length;
                break;
            default:
                this.numberOfResults = 0;
        }
    }

    submit() {
        const { teaching_id } = this.courseRelationForm.value;

        if (this.courseForm.valid && teaching_id) {
            let course: Course = this.courseService.createCourseEntity(this.courseForm, this.courseRelationForm);
            console.log(course);
            this.courseService
                .addCourse(course)
                .then((response) => {
                    this.isLoading = false;
                    this.resetForms();
                    this.close();
                })
                .catch((error) => {
                    console.log(error);
                    this.isLoading = false;
                });
        } else {
            this.courseForm.markAllAsTouched();
        }
    }

    close(reload: boolean = false) {
        this.closed.emit(reload);
    }

    private filterMap<T>(map: Map<string, T>, searchText: string): Array<{ key: string; value: T }> {
        const filtered = Array.from(map)
            .filter(([key, value]) => !searchText || key.toLowerCase().includes(searchText))
            .map(([key, value]) => ({ key, value }));
        return filtered;
    }

    private resetForms() {
        this.courseForm.reset();
        this.courseRelationForm.reset();
        (this.courseRelationForm.get('personals') as FormArray).clear();
        (this.courseRelationForm.get('rooms') as FormArray).clear();
        (this.courseRelationForm.get('subGroups') as FormArray).clear();
    }

    startTimeBeforeEndTimeValidator(fg: FormGroup) {
        const startControl = fg.get('starttime');
        const endControl = fg.get('endtime');

        if (startControl && endControl) {
            const start = startControl.value;
            const end = endControl.value;
            console.log(start);
            console.log(end);

            if (start && end) {
                const isValid = start < end;
                console.log(isValid);
                if (!isValid) {
                    endControl.setErrors({ startTimeBeforeEndTime: true });
                } else {
                    endControl.setErrors(null);
                }
            }
        }

        return null;
    }
}
