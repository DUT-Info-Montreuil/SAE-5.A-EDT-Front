import { AbstractModel } from './AbstractModel';

export class Teaching extends AbstractModel {
    /**
     * Attributes
     */
    title?: string;
    hour_number?: string;
    semestre?: string;
    sequence?: string;
    description?: string;
    teaching_type?: string;

    /**
     * Relations Id
     */
    specialization_id?: string;

    constructor(teaching?: Partial<Teaching>) {
        super(teaching?.id);
        Object.assign(this, teaching);
    }
}
