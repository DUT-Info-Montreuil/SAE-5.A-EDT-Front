// user.model.ts
import { Role } from '../enums/Role';
import { AbstractModel } from './AbstractModel';

export class User extends AbstractModel {
    /**
     * Attributes
     */
    username?: string;
    role?: Role;

    constructor(user?: Partial<User>) {
        super(user?.id);
        Object.assign(this, user);
    }
}
