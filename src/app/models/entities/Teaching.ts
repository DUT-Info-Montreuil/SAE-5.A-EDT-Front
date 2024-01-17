import { ColorType } from '../enums/ColorType';
import { AbstractModel } from './AbstractModel';
import { Color } from './Color';

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
    color?: ColorType;

    /**
     * Relations Id
     */
    specialization_id?: string;

    constructor(teaching?: Partial<Teaching>) {
        super(teaching?.id);
        Object.assign(this, teaching);
    }

    getSearchValue(): string {
        return this.title || '';
    }
}
