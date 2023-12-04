export abstract class AbstractModel {
    id?: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(id?: string, created_at?: Date) {
        this.id = id;
        this.created_at = created_at;
    }
}
