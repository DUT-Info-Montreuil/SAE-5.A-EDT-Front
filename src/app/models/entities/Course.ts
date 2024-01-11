import { Personal, Room, Subgroup, Teaching } from '.';
import { CourseType } from '../enums';
import { AbstractModel } from './AbstractModel';

export class Course extends AbstractModel {
    /**
     * Attributes
     */
    description?: string;
    starttime!: string;
    endtime!: string;
    duree?: string;
    course_type?: CourseType;

    /**
     * Relations Id
     */
    teaching_id?: string;

    /**
     * Relations
     */
    teaching?: Teaching;
    personals?: Personal[];
    rooms?: Room[];
    subgroups?: Subgroup[];

    constructor(course?: Partial<Course>) {
        super(course?.id);
        Object.assign(this, course);
    }
}
