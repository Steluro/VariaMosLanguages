import { FC } from "react";
import { Button, Card, Row, Col, Dropdown } from "react-bootstrap";
import { PersonFillDash } from "react-bootstrap-icons";

const ROLES = ["viewer", "editor", "manager"] as const;

/**
 * Props for the CollaboratorCard component
 * @interface CollaboratorCardProps
 * @property {string} name - The collaborator name
 * @property {string} uuid - The collaborator UUID
 * @property {string} email - The collaborator email
 * @property {string} role - The collaborator role
 * @property {(userId: string) => Promise<void>} onDeleteCollaborator - Callback to delete the collaborator
 * @property {(userId: string, newRole: string) => Promise<void>} onRoleChange - Callback to change the collaborator role
 * @property {boolean} isLoading - Whether the card is in loading state
 */
interface CollaboratorCardProps {
  name: string;
  uuid: string;
  email: string;
  role: string;
  onDeleteCollaborator: (userId: string) => Promise<void>;
  onRoleChange?: (userId:string,newRole: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Card component displaying a collaborator with delete and role change actions
 * @param {CollaboratorCardProps} props - The component props
 * @returns {JSX.Element} The rendered collaborator card
 */
export const CollaboratorCard: FC<CollaboratorCardProps> = ({ name, uuid, email, role, onDeleteCollaborator, onRoleChange, isLoading }) => {
    return (
    <Card className="mb-2 border">
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <div className="fw-bold">{name}</div>
            <div className="text-muted small">{email}</div>
          </Col>
          <Col xs="auto" className="text-end">
            <div className="d-flex gap-1 mt-1">
               <Button
                 variant="danger"
                 className="btn-Variamos-red"
                 onClick={()=> {console.log("you click on the icon"); onDeleteCollaborator?.(uuid)}}
                 size="sm"
                 title={"Remove access"}
              >
                <PersonFillDash />
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="primary" size="sm">
                  {role}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {ROLES.map((r) => (
                    <Dropdown.Item 
                      key={r} 
                      onClick={() => onRoleChange?.(uuid, r)}
                      disabled={r === role}
                      active={r === role}
                    >
                      {r}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

