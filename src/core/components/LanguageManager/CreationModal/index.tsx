import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

/**
 * Props for the CreationModal component
 * @interface CreationModalProps
 * @property {boolean} show - Whether the modal is visible
 * @property {() => void} onHide - Callback when modal is closed
 * @property {(name: string, type: "scope" | "domain" | "application") => void} onCreate - Callback to create a language
 */
interface CreationModalProps {
  show: boolean;
  onHide: () => void;
  onCreate: (name: string, type: "scope" | "domain" | "application") => void;
}

/**
 * Modal component for creating a new language
 * Allows entering language name and selecting type (scope, domain, or application)
 * @param {CreationModalProps} props - The component props
 * @returns {JSX.Element} The rendered creation modal
 */
export default function CreationModal({ show, onHide, onCreate }: CreationModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"scope" | "domain" | "application">("scope");

  /**
   * Handle form submission to create language
   * @param {React.FormEvent} e - The form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim(), type);
      setName("");
      setType("scope");
    }
  };

  /**
   * Handle modal close and reset form
   */
  const handleHide = () => {
    setName("");
    setType("scope");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Language</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="languageName">
            <Form.Label>Language Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter language name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="languageType">
            <Form.Label>Language Type</Form.Label>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value as "scope" | "domain" | "application")}
            >
              <option value="scope">Scope</option>
              <option value="domain">Domain</option>
              <option value="application">Application</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!name.trim()}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
