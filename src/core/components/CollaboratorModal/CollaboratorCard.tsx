import { FC } from "react";
import { Button, Card, Row, Col, Dropdown } from "react-bootstrap";
import { PersonFillDash } from "react-bootstrap-icons";

const ROLES = ["viewer", "editor", "manager"] as const;

interface CollaboratorCardProps {
  name: string;
  uuid: string;
  email: string;
  role: string;
  onDeleteCollaborator: (userId: string) => Promise<void>;
  onRoleChange?: (userId:string,newRole: string) => Promise<void>;
  isLoading?: boolean;
}

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

