export class Language {
  uuid: string;
  name: string;
  type: "scope" | "domain" | "application";
  status: "draft" | "pending" | "published" | "deleted";
  createdAt?: Date;
  updatedAt?: Date;
  owner?: {
    id: string;
    name: string;
    email: string;
  };

  constructor(
    uuid: string,
    name: string,
    ownerId: string,
    type: "scope" | "domain" | "application",
    status: "draft" | "pending" | "published" | "deleted" = "draft",
    publicVersionId?: string,
    createdAt?: Date,
    updatedAt?: Date,
    owner?: { id: string; name: string, email: string }
  ) {
    this.uuid = uuid;
    this.name = name;
    this.type = type;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.owner = owner;
  }
}
