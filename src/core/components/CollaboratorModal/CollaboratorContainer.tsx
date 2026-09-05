import { Spinner } from "react-bootstrap";
import { CollaboratorCard } from "./CollaboratorCard";

/**
 * Props for the CollaboratorsContainer component
 * @interface CollaboratorsContainerProps
 * @property {any[]} collaborators - The list of collaborators
 * @property {boolean} loading - Whether container is in loading state
 * @property {(userId: string) => Promise<void>} onDeleteCollaborator - Callback to delete a collaborator
 * @property {(userId: string, newRole: string) => Promise<void>} onRoleChange - Callback to change a collaborator role
 */
export interface CollaboratorsContainerProps {
  collaborators: any[];
  loading: boolean;
  onDeleteCollaborator?: (userId: string) => Promise<void>;
  onRoleChange?: (userId: string, newRole: string) => Promise<void>;
}

/**
 * Container component for displaying a list of collaborator cards
 * Handles loading and empty states
 * @param {CollaboratorsContainerProps} props - The component props
 * @returns {JSX.Element} The rendered collaborators container
 */
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
