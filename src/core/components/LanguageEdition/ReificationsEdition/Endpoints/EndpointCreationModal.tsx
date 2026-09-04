import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

/**
 * Props for the EndpointCreationModal component
 * @interface EndpointCreationModalProps
 * @property {boolean} show - Whether the modal is visible
 * @property {() => void} onHide - Callback when the modal is closed
 * @property {(name: string, arity: number) => void} onConfirm - Callback when endpoint is created with name and arity
 */
interface EndpointCreationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (name: string, arity: number) => void;
}

/**
 * Modal component for creating new endpoints with name and arity
 * @param {EndpointCreationModalProps} props - The component props
 * @returns {JSX.Element} The rendered endpoint creation modal
 */
export function EndpointCreationModal({ show, onHide, onConfirm }: EndpointCreationModalProps) {
  const [name, setName] = useState('');
  const [arity, setArity] = useState<string>('1');
  const [showInvalidNumberAlert, setShowInvalidNumberAlert] = useState(false);

  /**
   * Handle endpoint creation with validation
   */
  const handleCreate = () => {
    const arityValue = arity === '-1' ? -1 : parseInt(arity, 10);
    if (name.trim() && (arityValue === -1 || (arityValue > 0 && !isNaN(arityValue)))) {
      onConfirm(name.trim(), arityValue);
      setName('');
      setArity('1');
      onHide();
      setShowInvalidNumberAlert(false);
    } else {
      setShowInvalidNumberAlert(true);
    }
  };

  /**
   * Handle modal cancel and reset form
   */
  const handleCancel = () => {
    setName('');
    setArity('1');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Adding Endpoints</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showInvalidNumberAlert && (
          <Alert variant="danger" className="mb-3">
            Please enter a valid name and a positive integer or -1 for infinity
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter endpoint name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Arity</Form.Label>
            {arity === '0' && (
              <Alert variant="danger" className="mb-2">
                Arity must be a positive integer or -1 for infinity
              </Alert>
            )}
            <Form.Control
              type="number"
              value={arity}
              onChange={(e) => setArity(e.target.value)}
              placeholder="Enter arity (use -1 for inf)"
              min="-1"
            />
            <Form.Text className="text-muted">
              Enter a positive integer or -1 for infinity
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
