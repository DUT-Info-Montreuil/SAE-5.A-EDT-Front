import { AbstractModel } from './AbstractModel';

export class Room extends AbstractModel {
    /**
     * Attributes
     */
    code?: string;
    capacity?: Number;
    has_computer?: boolean;
    has_projector?: boolean;

    constructor(room?: Partial<Room>) {
        super(room?.id);
        Object.assign(this, room);
    }

    getSearchValue(): string {
        return this.code || '';
    }
}
