import { AbstractModel } from './AbstractModel';
import { Personal } from './Personal';
import { Room } from './Room';
import { SubGroup } from './SubGroup';

export class Course extends AbstractModel {
    /**
     * Attributes
     */
    description?: string;
    starttime!: string;
    endtime!: string;
    duree?: string;
    course_type?: string;
    personal_code?: string[];
    personal_lastName?: string;
    personal_firstName?: string;
    teaching_title?: string;
    room_name?: string[];
    room_code?: string;

    /**
     * Relations Id
     */
    teaching_id?: string;

    /**
     * Relations
     */
    personals?: Personal[];
    rooms?: Room[];
    subGroups?: SubGroup[];

    constructor(course?: Partial<Course>) {
        super(course?.id);
        Object.assign(this, course);
    }
}
