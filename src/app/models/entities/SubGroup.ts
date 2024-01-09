import { AbstractModel } from './AbstractModel';

export class Subgroup extends AbstractModel {
    /**
     * Attributes
     */
    name?: string;

    /**
     * Relations Id
     */
    group_id?: string;

    constructor(subgroup?: Partial<Subgroup>) {
        super(subgroup?.id);
        Object.assign(this, subgroup);
    }
}
