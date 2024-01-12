import { AbstractModel } from './AbstractModel';

export class Group extends AbstractModel {
    /**
     * Attributes
     */
    promotion?: string;
    type?: string;

    /**
     * Relations Id
     */
    department_id?: string;

    constructor(group?: Partial<Group>) {
        super(group?.id);
        Object.assign(this, group);
    }

    getSearchValue(): string {
        return this.type || '';
    }
}
