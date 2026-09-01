import {useState} from 'react';
import { Form, Button, Col, Alert, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Plus, Trash, X } from 'react-bootstrap-icons';
import { ReificationTypeEndpoint } from '../../../../../Domain/ProductLineEngineering/Entities/ReificationTypeEndpoint';
import { ElementType } from '../../../../../Domain/ProductLineEngineering/Entities/ElementType';
import { EndpointStyle } from './EndpointStyle';



interface EndpointRowProps {
  endpoint: ReificationTypeEndpoint;
  onNameChange: (uuid: string, newName: string) => void;
  onArityChange: (uuid: string, newArity: number) => void;
  onAddElement: (endpoint : ReificationTypeEndpoint, element: ElementType) => void;
  onRemoveElement: (endpoint : ReificationTypeEndpoint, element: ElementType) => void;
  onDeleteEndpoint: (uuid: string) => void;
  onStyleChange: (uuid: string, newStyle: Record<string, unknown>) => void;
  availableElements?: ElementType[];
}

export const EndpointRow = ({ endpoint, onNameChange, onAddElement, onRemoveElement, onArityChange, onDeleteEndpoint, onStyleChange, availableElements = [] }: EndpointRowProps) => {
  const [arity, setArity] = useState(endpoint.arity.toString());
    return (
        <>
          {arity === '0' && (
            <Alert variant="danger" className="mb-2">
              Arity must be a positive integer or -1 for infinity
            </Alert>
          )}
          <Col xs="auto">
            <EndpointStyle style={endpoint.style || {}} onStyleChange={(newStyle) => onStyleChange(endpoint.uuid, newStyle)} />
          </Col>
          <Col xs={3}>
            <Form.Control
              type="text"
              value={endpoint.name}
              onChange={(e) => onNameChange(endpoint.uuid, e.target.value)}
              placeholder="Endpoint name"
            />
          </Col>
          <Col xs="auto">
            <Form.Control
              type="number"
              value={arity}
              onChange={(e) => onArityChange(endpoint.uuid, parseInt(e.target.value))}
              placeholder="Enter arity (use -1 for inf)"
              min="-1"
              style={{ width: '4rem' }}
            />
          </Col>
          <Col className="d-flex flex-wrap gap-2" style={{ overflowX: 'auto', minWidth: 0 }}>
            {endpoint.elementTypes.map((elementType) => (
              <OverlayTrigger
                key={elementType.uuid}
                placement="top"
                overlay={<Tooltip>{elementType.description}</Tooltip>}
              >
                <div className="d-flex align-items-center gap-2 bg-white border rounded p-2" style={{ height: '38px' }}>
                  <span>{elementType.name}</span>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => onRemoveElement(endpoint, elementType)}
                    className="p-0 text-danger"
                    style={{ border: 'none' }}
                  >
                    <X size={14} />
                  </Button>
                </div>
              </OverlayTrigger>
            ))}
          </Col>
          <Col xs="auto" className="d-flex gap-2 ms-auto">
            <Dropdown>
               <Dropdown.Toggle 
                variant="outline-primary" 
                size="sm" 
                className="px-2"
                style={{ padding: '0.25rem 0.5rem' }}
              >
                <Plus size={14} />
              </Dropdown.Toggle>
              <style>{`
                .dropdown-toggle::after {
                  display: none !important;
                }
              `}</style>
              <Dropdown.Menu>
                {availableElements.map((element) => (
                  <Dropdown.Item key={element.uuid} onClick={() => onAddElement(endpoint, element)}>
                    {element.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDeleteEndpoint(endpoint.uuid)}
              className="px-2"
              name="delete endpoint"
            >
              <Trash size={14} />
            </Button>
          </Col>
        </>
    );
};