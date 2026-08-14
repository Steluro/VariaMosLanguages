import {useState} from 'react';
import { Form, Button, Col, Alert, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Plus, Trash, X } from 'react-bootstrap-icons';
import { ElementType } from '../../../../Domain/ProductLineEngineering/Entities/ElementType';


interface EndpointRowProps {
  elementType: ElementType[];
  endpointName: string;
  availableElements: ElementType[];
  onAddElement: (element: ElementType) => void;
  onRemoveElement: (element: ElementType) => void;
}

export const EndpointRow = ({ elementType, endpointName,onAddElement,onRemoveElement, availableElements = [] }: EndpointRowProps) => {

    return (
        <>
          <Col xs={3}>
            <strong>{endpointName}</strong>
          </Col>
          <Col className="d-flex flex-wrap gap-2" style={{ overflowX: 'auto', minWidth: 0 }}>
            {elementType.map((elementType) => (
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
                    className="p-0 text-danger"
                    style={{ border: 'none' }}
                    onClick={()=>onRemoveElement(elementType)}
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
                  <Dropdown.Item 
                  key={element.uuid}
                  onClick={()=>onAddElement(element)} >
                    {element.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </> 
    );
};