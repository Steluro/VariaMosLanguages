import { ElementType } from "./ElementType";

export class ReificationTypeEndpoint{
    uuid: string;
    reificationTypeId: string;
    name: string;
    arity: number;
    style: Record<string, unknown>;
    elementTypes: ElementType[];

    constructor(
        reificationTypeId: string,
        name: string,
        arity: number,
    ) {
        this.reificationTypeId = reificationTypeId;
        this.name = name;
        this.arity = arity;
    }
}