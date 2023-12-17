import { AbstractModel } from './AbstractModel';

export class Course extends AbstractModel {
    /**
     * Attributes
     */
    description?: string;
    starttime!: string;
    endtime!: string;
    duree?: string;
    course_type?: string;
    personal_id?: string;
    rooms_id?: string;
    teaching_id?: string;
    personal_code?: string;
    personal_lastName?: string;
    personal_firstName?: string;
    teaching_title?: string;
    room_name?: string;
    room_code?: string;

    constructor(course?: Partial<Course>) {
        super(course?.id);
        Object.assign(this, course);
    }
}
