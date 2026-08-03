import { Button, Modal, Row, Col } from 'react-bootstrap';
// import { UsersContainer } from './UsersContainer';

export interface SharedUserModalProps {
  languageId?: string;
  show?: boolean;
  onClose?: () => void;
  onShareUser?: (userId: string, languageId: string) => Promise<void>;
}

export default function SharedUserModal({ languageId ,show, onClose, onShareUser }: SharedUserModalProps) {
  return (
    <Modal 
      show={show} 
      onHide={onClose}
      dialogClassName="modal-70w"
      style={{ maxWidth: '70vw', margin: 'auto' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Grant Access to Users</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '70vh', overflowY: 'auto' }}>
        <Row style={{ height: '100%' }}>
          <Col md={6} style={{ borderRight: '1px solid #dee2e6', paddingRight: '20px' }}>
            <h5>share with</h5>
            {/* <UsersContainer languageId={languageId} onShareUser={onShareUser} /> */}
          </Col>
          <Col md={6} style={{ paddingLeft: '20px' }}>
            <h5>ajouter des user</h5>
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
