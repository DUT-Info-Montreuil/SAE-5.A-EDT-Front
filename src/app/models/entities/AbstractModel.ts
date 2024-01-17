export abstract class AbstractModel {
    id?: string;

    constructor(id?: string) {
        if (id) {
            this.id = id;
        }
    }
}
