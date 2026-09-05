import { useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";

const ROLES = ["viewer", "editor", "manager"] as const;
type Role = typeof ROLES[number];

/**
 * Props for the AddCollaborator component
 * @interface AddCollaboratorProps
 * @property {string} languageId - The ID of the language
 * @property {(email: string, role: string) => Promise<void>} onInvite - Callback to invite a collaborator
 */
export interface AddCollaboratorProps {
  languageId: string;
  onInvite: (email: string, role: string) => Promise<void>;
}

/**
 * Component for adding a new collaborator with email and role selection
 * @param {AddCollaboratorProps} props - The component props
 * @returns {JSX.Element} The rendered add collaborator component
 */
function AddCollaboratorComponent({
  onInvite,
}: AddCollaboratorProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("viewer");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle collaborator invitation
   * @param {string} email - The email of the user to invite
   * @param {string} role - The role to assign to the collaborator
   */
  const handleInvite = async (email: string, role: string) => {
    if (!email) return;
    
    setIsLoading(true);
    try {console.log(email);
      await onInvite(email, role);
      setEmail("");
      setRole("viewer");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle role selection from dropdown
   * @param {Role} selectedRole - The selected role
   */
  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  return (
    <Form>
      <Form.Group controlId="shareInput" className="mb-3">
        <Form.Label>User Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="shareRole" className="mb-3">
        <Form.Label>User Role</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            {role}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {ROLES.map((r) => (
              <Dropdown.Item 
                key={r} 
                onClick={() => handleRoleSelect(r)}
                active={r === role}
              >
                {r}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Button
        variant="primary"
        onClick={()=>handleInvite(email,role)}
        disabled={!email || isLoading}
      >
        {isLoading ? "Inviting..." : "Invite"}
      </Button>
    </Form>
  );
}

export const AddCollaborator = AddCollaboratorComponent;