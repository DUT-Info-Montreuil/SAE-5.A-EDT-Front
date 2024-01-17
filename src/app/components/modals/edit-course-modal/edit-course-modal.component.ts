import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Personal, Room, Course, Teaching, Subgroup, Group, Specialization } from 'src/app/models/entities';
import { CourseType, FilterType } from 'src/app/models/enums';
import { CourseService } from 'src/app/services/course.service';
import moment from 'moment';

@Component({
    selector: 'app-edit-course-modal',
    templateUrl: './edit-course-modal.component.html',
    styleUrls: ['./edit-course-modal.component.css'],
})
export class EditCourseModalComponent {
    @Input() course!: Course;
    @Input() mapPersonals!: Map<string, Personal>;
    @Input() mapRooms!: Map<string, Room>;
    @Input() mapTeachings!: Map<string, Teaching>;
    @Input() mapSpecializations!: Map<string, Specialization>;
    @Input() mapGroups!: Map<string, Group>;
    @Input() mapSubGroups!: Map<string, Subgroup>;
    @Input() isOpen!: boolean;
    @Output() closed = new EventEmitter<boolean>();
    FilterType = FilterType;
    isLoading: boolean = false;
    courseForm: FormGroup;
    courseRelationForm: FormGroup;
    modalStep: number = 0;
    groupStep: number = 0;
    course_types = Object.keys(CourseType).map((key) => ({ value: key, label: CourseType[key as keyof typeof CourseType] }));
    selectedTeaching?: Teaching;
    selectedGroup?: Group;
    selectedSpecialization?: Specialization;
    filterType?: FilterType = FilterType.Teaching;
    searchText: string = '';
    filteredTeachings: Array<{ key: string; value: Teaching }> = [];
    filteredPersonals: Array<{ key: string; value: Personal }> = [];
    filteredRooms: Array<{ key: string; value: Room }> = [];
    filteredSpecializations: Array<{ key: string; value: Specialization }> = [];
    filteredGroups: Array<{ key: string; value: Group }> = [];
    filteredSubGroups: Array<{ key: string; value: Subgroup }> = [];
    numberOfResults: number = 0;
    groups?: Group[];
    specializations?: Specialization[];

    constructor(private fb: FormBuilder, private courseService: CourseService) {
        this.courseForm = this.fb.group(
            {
                id: [''],
                description: ['', [Validators.required, Validators.minLength(3)]],
                date: ['', Validators.required],
                starttime: ['', Validators.required],
                endtime: ['', Validators.required],
                course_type: ['', Validators.required],
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
        if (changes['course'] && this.course) {
            this.resetForms();
            this.fillFormWithCourseData(this.course);
            this.fillGroupsAndSubgroups();
        }
    }

    onSearchChange(searchText: string): void {
        this.searchText = searchText.toLowerCase();
        this.filteredTeachings = this.filterMap(this.mapTeachings, this.searchText);
        this.filteredPersonals = this.filterMap(this.mapPersonals, this.searchText);
        this.filteredRooms = this.filterMap(this.mapRooms, this.searchText);
        this.filteredSpecializations = this.filterMap(this.mapSpecializations, this.searchText);
        this.filteredGroups = this.filterMap(this.mapGroups, this.searchText);
        this.filteredSubGroups = this.filterMap(this.mapSubGroups, this.searchText);

        if (this.selectedSpecialization) {
            this.filteredGroups = Array.from(this.mapGroups.values())
                .filter((group) => group.promotion === this.selectedSpecialization!.id && group.department_id === this.selectedSpecialization!.department_id)
                .map((group) => ({ key: group.id!, value: group }));
        }

        if (this.selectedGroup) {
            this.filteredSubGroups = Array.from(this.mapSubGroups.values())
                .filter((subgroup) => subgroup.group_id === this.selectedGroup!.id)
                .map((subgroup) => ({ key: subgroup.id!, value: subgroup }));
        }

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

    setActiveFilterType(filterType: FilterType) {
        this.filterType = filterType;
        this.updateNumberOfResults();
    }

    isSelectedTeaching(value: Teaching): boolean {
        return this.selectedTeaching?.id === value?.id;
    }

    selectTeaching(value: Teaching) {
        this.selectedTeaching = value;
        this.courseRelationForm.get('teaching_id')?.setValue(value.id);
    }

    selectSpecialization(value: Specialization) {
        this.selectedSpecialization = value;
        this.groupStep++;
        this.filteredGroups = Array.from(this.mapGroups.values())
            .filter((group) => group.promotion === value.id && group.department_id === value.department_id)
            .map((group) => ({ key: group.id!, value: group }));
        this.updateNumberOfResults();
    }

    selectGroup(value: Group) {
        this.selectedGroup = value;
        this.groupStep++;
        this.filteredSubGroups = Array.from(this.mapSubGroups.values())
            .filter((subGroup) => subGroup.group_id === value.id)
            .map((subGroup) => ({ key: subGroup.id!, value: subGroup }));
        this.updateNumberOfResults();
    }

    resetToStep(step: number) {
        this.groupStep = step;

        if (step < 1) {
            this.selectedSpecialization = undefined;
        }

        if (step < 2) {
            this.selectedGroup = undefined;
        }
        this.updateNumberOfResults();
    }

    toggleSelection(item: Personal | Room | Subgroup): void {
        let array: FormArray;

        if (item instanceof Personal) {
            array = this.courseRelationForm.get('personals') as FormArray;
        } else if (item instanceof Room) {
            array = this.courseRelationForm.get('rooms') as FormArray;
        } else if (item instanceof Subgroup) {
            array = this.courseRelationForm.get('subgroups') as FormArray;
        } else {
            throw new Error('Type non géré');
        }

        if (this.isSelected(item)) {
            const index = array.value.findIndex((x: any) => x.id === item.id);
            array.removeAt(index);
        } else {
            array.push(new FormControl(item));
        }

        this.fillGroupsAndSubgroups();
    }

    isSelected(item: Personal | Room | Subgroup | Group | Specialization): boolean {
        if (item instanceof Personal) {
            return this.isSelectedInFormArray(item, this.courseRelationForm.get('personals') as FormArray);
        } else if (item instanceof Room) {
            return this.isSelectedInFormArray(item, this.courseRelationForm.get('rooms') as FormArray);
        } else if (item instanceof Subgroup) {
            return this.isSelectedInFormArray(item, this.courseRelationForm.get('subgroups') as FormArray);
        } else if (item instanceof Group) {
            return this.groups?.some((group) => group.id === item.id) ?? false;
        } else if (item instanceof Specialization) {
            return this.specializations?.some((specialization) => specialization.id === item.id) ?? false;
        } else {
            throw new Error('Type non géré');
        }
    }

    private isSelectedInFormArray(item: any, array: FormArray): boolean {
        return array.value.some((x: any) => x.id === item.id);
    }

    fillGroupsAndSubgroups() {
        this.groups = [];
        this.specializations = [];

        const subGroupsFormArray = this.courseRelationForm.get('subgroups') as FormArray;

        subGroupsFormArray.controls.forEach((control) => {
            const subGroupId = control.value.id;
            const subGroup = this.mapSubGroups.get(subGroupId);

            if (subGroup) {
                const group = this.mapGroups.get(subGroup.group_id!);
                if (group) {
                    this.groups!.push(group);

                    const specialization = this.mapSpecializations.get(group.promotion!);
                    if (specialization) {
                        this.specializations!.push(specialization);
                    }
                }
            }
        });
    }

    onNextStep() {
        if (this.modalStep === 0 && this.courseForm.valid) {
            this.modalStep++;
        } else {
            this.courseForm.markAllAsTouched();
        }
    }

    onBeforeStep() {
        this.modalStep--;
    }

    goToDeleteConfirmation() {
        this.modalStep = 2;
    }

    cancelDeletion() {
        this.modalStep = 0;
    }

    confirmDeletion() {
        this.deleteCourse();
        this.modalStep = 0;
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
                if (this.groupStep === 0) {
                    this.numberOfResults = this.filteredSpecializations.length;
                } else if (this.groupStep === 1) {
                    this.numberOfResults = this.filteredGroups.length;
                } else {
                    this.numberOfResults = this.filteredSubGroups.length;
                }
                break;
            default:
                this.numberOfResults = 0;
        }
    }

    deleteCourse() {
        this.courseService
            .deleteCourse(this.course?.id!)
            .then((response) => {
                this.resetForms();
                this.close(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    submit() {
        this.isLoading = true;
        const { teaching_id } = this.courseRelationForm.value;

        if (this.courseForm.valid && teaching_id) {
            let course: Course = this.courseService.createCourseEntity(this.courseForm, this.courseRelationForm);
            this.courseService
                .updateCourse(course)
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
            this.courseForm.markAllAsTouched();
        }
    }

    close(reload: boolean = false) {
        this.closed.emit(reload);
    }

    private filterMap<T extends Personal | Room | Subgroup | Teaching | Specialization | Group>(map: Map<string, T>, searchText: string): Array<{ key: string; value: T }> {
        const filtered = Array.from(map)
            .filter(([key, value]) => !searchText || value.getSearchValue().toLowerCase().includes(searchText))
            .map(([key, value]) => ({ key, value }));
        return filtered;
    }

    private resetForms() {
        this.courseForm.reset();
        this.courseRelationForm.reset();

        const personalsArray = this.courseRelationForm.get('personals') as FormArray;
        const roomsArray = this.courseRelationForm.get('rooms') as FormArray;
        const subgroupsArray = this.courseRelationForm.get('subgroups') as FormArray;

        if (personalsArray) {
            personalsArray.clear();
        }

        if (roomsArray) {
            roomsArray.clear();
        }

        if (subgroupsArray) {
            subgroupsArray.clear();
        }

        this.searchText = '';
        this.filterType = FilterType.Teaching;
        this.modalStep = 0;
        this.selectedTeaching = undefined;
        this.groups = undefined;
        this.specializations = undefined;
        this.resetToStep(0);
    }

    private fillFormWithCourseData(course: Course) {
        this.courseForm.patchValue({
            id: course.id,
            description: course.description,
            date: course.starttime,
            starttime: this.convertToTime(course.starttime),
            endtime: this.convertToTime(course.endtime),
            course_type: course.course_type,
        });

        this.courseRelationForm.setControl('personals', this.fb.array(course.personals || []));
        this.courseRelationForm.setControl('rooms', this.fb.array(course.rooms || []));
        this.courseRelationForm.setControl('subgroups', this.fb.array(course.subgroups || []));
        this.selectTeaching(course.teaching!);
    }

    private startTimeBeforeEndTimeValidator(fg: FormGroup) {
        const startControl = fg.get('starttime');
        const endControl = fg.get('endtime');
        if (startControl && endControl) {
            const start = startControl.value;
            const end = endControl.value;
            if (start && end) {
                const isValid = start < end;
                if (!isValid) {
                    endControl.setErrors({ startTimeBeforeEndTime: true });
                } else {
                    endControl.setErrors(null);
                }
            }
        }
        return null;
    }

    private convertToTime(d: string) {
        const date = new Date(d);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}
