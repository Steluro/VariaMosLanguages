import { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { CollaboratorsContainer } from './CollaboratorContainer';
import { AddCollaborator } from './AddCollaborator';
import { inviteCollaborator, deleteCollaborator, updateCollaboratorRole, queryCollaborators } from '../../../DataProvider/Services/collaborator.service';

export interface CollaboratorModalProps {
  languageId?: string;
  show?: boolean;
  onClose?: () => void;
}

export default function CollaboratorModal({ languageId ,show, onClose }: CollaboratorModalProps) {
  const [inviteMessage, setInviteMessage] = useState<string | null>(null);
  const [inviteMessageType, setInviteMessageType] = useState<'success' | 'danger' | null>(null);
  const [collaboratorMessage, setCollaboratorMessage] = useState<string | null>(null);
  const [collaboratorMessageType, setCollaboratorMessageType] = useState<'success' | 'danger' | null>(null);
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const reloadCollaborators = async () => {
    if (!languageId) return;
    setLoading(true);
    try {
      const collaboratorsResponse = await queryCollaborators(languageId);
      setCollaborators(collaboratorsResponse);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      setCollaborators([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!show) {
      setInviteMessage(null);
      setInviteMessageType(null);
      setCollaboratorMessage(null);
      setCollaboratorMessageType(null);
    } else {
      reloadCollaborators();
    }
  }, [show, languageId]);

  const handleInviteCollaborator = async (email: string, role: string) => {
    setCollaboratorMessage(null);
    setCollaboratorMessageType(null);
    setInviteMessage(null);
    setInviteMessageType(null);
    try {
      const response = await inviteCollaborator(languageId, email, role);
      console.log("Response:", response);
      await reloadCollaborators();
      if (response.message) {
        setInviteMessage(response.message);
        setInviteMessageType('danger');
      } else {
        setInviteMessage("Collaborator invited successfully");
        setInviteMessageType('success');
      }
    } catch (error) {
      console.error("Error inviting collaborator:", error);
      setInviteMessage("Error inviting collaborator");
      setInviteMessageType('danger');
    }
  };

  const handleDeleteCollaborator = async (userId: string) => {
    setCollaboratorMessage(null);
    setCollaboratorMessageType(null);
    setInviteMessage(null);
    setInviteMessageType(null);
    try {
      const response = await deleteCollaborator(languageId, userId);
      await reloadCollaborators();
      if (response.message) {
        setCollaboratorMessage(response.message);
        setCollaboratorMessageType('danger');
      } else {
        setCollaboratorMessage("Collaborator removed successfully");
        setCollaboratorMessageType('success');
      }
    } catch (error) {
      console.error("Error deleting collaborator:", error);
      setCollaboratorMessage("Error deleting collaborator");
      setCollaboratorMessageType('danger');
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setCollaboratorMessage(null);
    setCollaboratorMessageType(null);
    setInviteMessage(null);
    setInviteMessageType(null);
    try {
      const response = await updateCollaboratorRole(languageId, userId, newRole);
      await reloadCollaborators();
      if (response.message) {
        setCollaboratorMessage(response.message);
        setCollaboratorMessageType('danger');
      } else {
        setCollaboratorMessage("Collaborator role updated successfully");
        setCollaboratorMessageType('success');
      }
    } catch (error) {
      console.error("Error changing role:", error);
      setCollaboratorMessage("Error changing role");
      setCollaboratorMessageType('danger');
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onClose}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Grant Access to Users</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '70vh', overflowY: 'auto' }}>
        <Row style={{ height: '100%' }}>
          <Col md={6} style={{paddingRight: '20px' }}>
            <h5>Collaborators</h5>
            {collaboratorMessage && (
              <Alert variant={collaboratorMessageType || 'danger'} className="mb-3">
                {collaboratorMessage}
              </Alert>
            )}
            <CollaboratorsContainer 
              collaborators={collaborators}
              loading={loading}
              onDeleteCollaborator={handleDeleteCollaborator}
              onRoleChange={handleRoleChange}
            />
          </Col>
          <Col md={6} style={{ paddingLeft: '20px' }}>
            <h5>Add collaborators</h5>
            {inviteMessage && (
              <Alert variant={inviteMessageType || 'danger'} className="mb-3">
                {inviteMessage}
              </Alert>
            )}
            <AddCollaborator
              languageId={languageId}
              onInvite={handleInviteCollaborator}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
