import { ReificationTypeEndpoint } from "./ReificationTypeEndpoint";

export class ReificationType{
    languageId : string
    uuid: string
    name: string
    description: string
    style: Record<string, unknown>
    properties: Record<string, unknown>
    constraint :string
    endpoints : ReificationTypeEndpoint[]
    constructor(name: string, languageId: string) {
      this.languageId = languageId;
      this.name = name;
    }
}