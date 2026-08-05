import { Spinner } from "react-bootstrap";
import { CollaboratorCard } from "./CollaboratorCard";

export interface CollaboratorsContainerProps {
  collaborators: any[];
  loading: boolean;
  onDeleteCollaborator?: (userId: string) => Promise<void>;
  onRoleChange?: (userId: string, newRole: string) => Promise<void>;
}

function CollaboratorsContainerComponent({
  collaborators,
  loading,
  onDeleteCollaborator,
  onRoleChange,
}: CollaboratorsContainerProps): JSX.Element {
  if (loading) {
    return (
      <div className="w-100 text-center">
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          className="mx-3"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!collaborators?.length) {
    return <div className="text-muted">No collaborators</div>;
  }

  return (
    <div className="d-flex flex-column gap-2">
      {collaborators.map((collaborator, index) => (
        <CollaboratorCard
          key={index}
          uuid={collaborator.user.id}
          name={collaborator.user.name || "Unknown"}
          email={collaborator.user.email || "No email"}
          role={collaborator.role || "Unknown"}
          onDeleteCollaborator={onDeleteCollaborator}
          onRoleChange={onRoleChange}
        />
      ))}
    </div>
  );
}

export const CollaboratorsContainer = CollaboratorsContainerComponent;
