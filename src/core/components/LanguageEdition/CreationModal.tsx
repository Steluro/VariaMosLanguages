import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

/**
 * Props for the CreationModal component
 * @interface CreationModalProps
 * @property {boolean} show - Whether the modal is visible
 * @property {"Element" | "Reification" | "Relation"} objectName - The type of object being created. Only used for printing purposes
 * @property {() => void} onHide - Callback when the modal is closed
 * @property {(name: string) => void} onCreate - Callback when the object is created with the given name
 */
interface CreationModalProps {
  show: boolean;
  objectName: "Element" | "Reification" | "Relation";
  onHide: () => void;
  onCreate: (name: string) => void;
}

/**
 * A modal component for creating new objects (Element, Reification, or Relation)
 * @param {CreationModalProps} props - The component props
 * @returns {JSX.Element} The rendered modal component
 */
export default function CreationModal({ show, objectName, onHide, onCreate }: CreationModalProps) {
  // State to store the name of the object to create
  const [name, setName] = useState("");

  /**
   * Handle form submission
   * @param {React.FormEvent} e - The form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      setName("");
      onHide();
    }
  };

  const handleHide = () => {
    setName("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New {objectName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="objectName">
            <Form.Label>{objectName} Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter ${objectName} name...`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
