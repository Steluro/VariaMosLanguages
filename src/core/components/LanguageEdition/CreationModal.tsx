import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

interface CreationModalProps {
  show: boolean;
  objectName: "Element" | "Reification" | "Relation";
  onHide: () => void;
  onCreate: (name: string) => void;
}

export default function CreationModal({ show, objectName, onHide, onCreate }: CreationModalProps) {
  const [name, setName] = useState("");

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
