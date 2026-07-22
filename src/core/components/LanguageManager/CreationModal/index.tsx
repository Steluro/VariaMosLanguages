import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

interface CreationModalProps {
  show: boolean;
  onHide: () => void;
  onCreate: (name: string, type: "scope" | "domain" | "application") => void;
}

export default function CreationModal({ show, onHide, onCreate }: CreationModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"scope" | "domain" | "application">("scope");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim(), type);
      setName("");
      setType("scope");
    }
  };

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
