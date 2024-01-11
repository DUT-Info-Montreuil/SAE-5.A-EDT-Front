import { AbstractModel } from './AbstractModel';

export class Personal extends AbstractModel {
    /**
     * Attributes
     */
    first_name?: string;
    last_name?: string;
    mail?: string;
    personal_code?: string;
    phone_number?: string;

    constructor(personal?: Partial<Personal>) {
        super(personal?.id);
        Object.assign(this, personal);
    }

    getSearchValue(): string {
        return this.personal_code || '';
    }
}
