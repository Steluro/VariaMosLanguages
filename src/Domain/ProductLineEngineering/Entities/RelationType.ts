import { ElementType } from "./ElementType";

export class RelationType{
    languageId: string;
    uuid: string;
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
    sources: ElementType[];
    targets: ElementType[];

    constructor(name: string, languageId: string) {
        this.languageId = languageId;
        this.name = name;
      }
}