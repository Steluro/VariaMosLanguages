export class Language {
  uuid: string;
  name: string;
  ownerId: string;
  type: "scope" | "domain" | "application";
  status: "draft" | "pending" | "published" | "deleted";
  publicVersionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  owner?: {
    id: string;
    name: string;
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
    owner?: { id: string; name: string }
  ) {
    this.uuid = uuid;
    this.name = name;
    this.ownerId = ownerId;
    this.type = type;
    this.status = status;
    this.publicVersionId = publicVersionId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.owner = owner;
  }
}
