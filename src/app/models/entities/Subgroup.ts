import { AbstractModel } from './AbstractModel';

export class Subgroup extends AbstractModel {
    /**
     * Attributes
     */
    name?: string;
    department?: string;
    promotion?: string;

    /**
     * Relations Id
     */
    group_id?: string;

    constructor(subgroup?: Partial<Subgroup>) {
        super(subgroup?.id);
        Object.assign(this, subgroup);
    }

    getSearchValue(): string {
        return this.name || '';
    }
}
