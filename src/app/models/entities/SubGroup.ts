import { AbstractModel } from './AbstractModel';

export class SubGroup extends AbstractModel {
    /**
     * Attributes
     */
    name?: string;

    /**
     * Relations Id
     */
    group_id?: string;

    constructor(subGroup?: Partial<SubGroup>) {
        super(subGroup?.id);
        Object.assign(this, subGroup);
    }
}
