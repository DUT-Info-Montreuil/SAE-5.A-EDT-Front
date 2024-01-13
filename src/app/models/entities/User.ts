// user.model.ts
import { AbstractModel } from './AbstractModel';

export class User extends AbstractModel {
    /**
     * Attributes
     */
    username?: string;

    constructor(user?: Partial<User>) {
        super(user?.id);
        Object.assign(this, user);
    }
}
