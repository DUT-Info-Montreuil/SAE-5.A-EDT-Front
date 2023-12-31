import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Teacher, Room, Course, Teaching } from 'src/app/models/entities';
import { FilterType } from 'src/app/models/enums';
import { CourseService } from 'src/app/services/course.service';

@Component({
    selector: 'app-course-modal',
    templateUrl: './course-modal.component.html',
    styleUrls: ['./course-modal.component.css'],
})
export class CourseModalComponent {
    @Input() mapTeachers!: Map<string, Teacher>;
    @Input() mapRooms!: Map<string, Room>;
    @Input() mapTeachings!: Map<string, Teaching>;
    @Input() isOpen!: boolean;
    @Output() closed = new EventEmitter<boolean>();
    FilterType = FilterType;
    isLoading: boolean = false;
    courseForm: FormGroup;
    courseFilterForm: FormGroup;
    currentStep: number = 1;
    course_types = [
        { value: 'RCC', label: 'Ressource Théorique' },
        { value: 'RT', label: 'Ressource Transversal' },
        { value: 'SAE', label: 'Saé' },
    ];
    color_types = [
        { value: 'PURPLE', label: 'Violet', color: 'bg-calendar-purple' },
        { value: 'PINK', label: 'Rose', color: 'bg-calendar-pink' },
        { value: 'RED', label: 'Rouge', color: 'bg-calendar-red' },
        { value: 'BLUE', label: 'Bleu', color: 'bg-calendar-blue' },
    ];
    selectedTeacher?: Teacher;
    selectedRoom?: Room;
    selectedTeaching?: Teaching;
    filterType?: FilterType = FilterType.Teaching;
    searchText: string = '';
    filteredTeachings: Array<{ key: string; value: Teaching }> = [];
    filteredTeachers: Array<{ key: string; value: Teacher }> = [];
    filteredRooms: Array<{ key: string; value: Room }> = [];
    numberOfResults: number = 0;

    constructor(private fb: FormBuilder, private courseService: CourseService) {
        this.courseForm = this.fb.group({
            description: ['', [Validators.required, Validators.minLength(3)]],
            date: ['', Validators.required],
            starttime: ['', Validators.required],
            endtime: ['', Validators.required],
            course_type: ['', Validators.required],
            color_type: ['', Validators.required],
        });

        this.courseFilterForm = this.fb.group({
            teaching_id: ['', Validators.required],
            personal_id: ['', Validators.required],
            room_id: ['', Validators.required],
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
        this.filteredTeachers = this.filterMap(this.mapTeachers, this.searchText);
        this.filteredRooms = this.filterMap(this.mapRooms, this.searchText);

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

    isSelectedFilter(type: FilterType, value: any): boolean {
        switch (type) {
            case FilterType.Teacher:
                return this.selectedTeacher === value;
            case FilterType.Room:
                return this.selectedRoom === value;
            case FilterType.Teaching:
                return this.selectedTeaching === value;
            default:
                return false;
        }
    }

    setActiveFilterType(filterType: FilterType) {
        this.filterType = filterType;
        this.updateNumberOfResults();
    }

    selectFilter(type: FilterType, value: Teacher | Teaching | Room) {
        if (this.courseFilterForm) {
            switch (type) {
                case FilterType.Teacher:
                    this.selectedTeacher = value as Teacher;
                    this.courseFilterForm.get('personal_id')?.setValue(this.selectedTeacher.id);
                    break;
                case FilterType.Room:
                    this.selectedRoom = value as Room;
                    this.courseFilterForm.get('room_id')?.setValue(this.selectedRoom.id);
                    break;
                case FilterType.Teaching:
                    this.selectedTeaching = value as Teaching;
                    this.courseFilterForm.get('teaching_id')?.setValue(this.selectedTeaching.id);
                    break;
            }
        }
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
            case FilterType.Teacher:
                this.numberOfResults = this.filteredTeachers.length;
                break;
            default:
                this.numberOfResults = 0;
        }
    }

    submit() {
        const courseData = this.courseForm.value;
        const filterData = this.courseFilterForm.value;
        const { teaching_id } = this.courseFilterForm.value;

        if (this.courseForm.valid && teaching_id) {
            let course: Course = new Course();
            Object.assign(course, courseData);

            if (filterData.teaching_id) {
                course.teaching_id = filterData.teaching_id;
            }
            if (filterData.personal_id) {
                course.personal_id = filterData.personal_id;
            }
            if (filterData.room_id) {
                course.rooms_id = filterData.room_id;
            }
            console.log(course);
            this.courseService
                .addCourse(course)
                .then((response) => {
                    this.isLoading = false;
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
}
