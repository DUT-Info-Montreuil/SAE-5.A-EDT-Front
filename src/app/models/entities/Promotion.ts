import { AbstractModel } from './AbstractModel';

export class Promotion extends AbstractModel {
    /**
     * Attributes
     */
    code?: string;
    name?: string;
    department_id?: string;

    constructor(promotion?: Partial<Promotion>) {
        super(promotion?.id);
        Object.assign(this, promotion);
    }
}
