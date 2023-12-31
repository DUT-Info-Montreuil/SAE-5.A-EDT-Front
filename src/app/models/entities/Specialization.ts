import { AbstractModel } from './AbstractModel';

export class Specialization extends AbstractModel {
    /**
     * Attributes
     */
    code?: string;
    name?: string;

    /**
     * Relations Id
     */
    department_id?: string;

    constructor(promotion?: Partial<Specialization>) {
        super(promotion?.id);
        Object.assign(this, promotion);
    }
}
