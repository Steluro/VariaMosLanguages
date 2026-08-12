import {useState} from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';



interface EndpointRowProps {
  endpoint: any;
  onNameChange: (uuid: string, newName: string) => void;
  onArityChange: (uuid: string, newArity: number) => void;
  onAddElement: (uuid: string) => void;
  onRemoveElement: (uuid: string) => void;
  onDeleteEndpoint: (uuid: string) => void;
}

export const EndpointRow = ({ endpoint, onNameChange, onAddElement, onRemoveElement, onArityChange, onDeleteEndpoint }: EndpointRowProps) => {
  const [arity, setArity] = useState(endpoint.arity.toString());
    return (
        <>
          {arity === '0' && (
            <Alert variant="danger" className="mb-2">
              Arity must be a positive integer or -1 for infinity
            </Alert>
          )}
          <Col xs={3}>
            <Form.Control
              type="text"
              value={endpoint.name}
              onChange={(e) => onNameChange(endpoint.uuid, e.target.value)}
              placeholder="Endpoint name"
            />
          </Col>
          <Col >
            <Form.Control
              type="number"
              value={arity}
              onChange={(e) => onArityChange(endpoint.uuid, parseInt(e.target.value))}
              placeholder="Enter arity (use -1 for inf)"
              min="-1"
              className='w-auto'
            />
          </Col>
          <Col >
            <div className="d-flex flex-wrap gap-2">
              {endpoint.elementName && (
                <div className="d-flex align-items-center gap-2 bg-light p-2 rounded">
                  <span>{endpoint.elementName}</span>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => onRemoveElement(endpoint.uuid)}
                    className="p-1"
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              )}
            </div>
          </Col>
          <Col xs={1} className="d-flex justify-content-end">
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={() => onAddElement(endpoint.uuid)}
              className="px-2"
            >
              <Plus size={14} />
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={() => onDeleteEndpoint(endpoint.uuid)}
              className="px-2"
            >
              <Trash size={14} />
            </Button>
          </Col>
        </>
    );
};