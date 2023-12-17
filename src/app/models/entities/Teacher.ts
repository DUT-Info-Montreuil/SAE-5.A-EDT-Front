import { AbstractModel } from './AbstractModel';

export class Teacher extends AbstractModel {
    /**
     * Attributes
     */
    first_name?: string;
    last_name?: string;
    mail?: string;
    personnal_code?: string;
    phone_number?: string;

    constructor(teacher?: Partial<Teacher>) {
        super(teacher?.id);
        Object.assign(this, teacher);
    }
}
