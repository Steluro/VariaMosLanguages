import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';
import { queryReificationTypeEndpoints, createReificationTypeEndpoint, updateReificationTypeEndpoint, deleteReificationTypeEndpoint } from '../../../../../DataProvider/Services/reificatonTypeEndpoints.service';
import { queryLanguageElementTypes } from '../../../../../DataProvider/Services/elementType.service';
import { EndpointCreationModal } from './EndpointCreationModal';
import { EndpointRow } from './EndpointRow';
import { set } from 'immer/dist/internal';

interface ReificationEndpointsProps {
  reificationUuid: string;
  languageUuid: string;
}

interface Endpoint {
  uuid: string;
  name: string;
  elementName?: string;
}

interface ElementType {
  languageId: string;
  uuid: string;
  name: string;
  description: string;
  style?: Record<string, unknown>;
  properties?: Record<string, unknown>;
  constraint?: string;
}

export function ReificationEndpointsEdition({ reificationUuid, languageUuid }: ReificationEndpointsProps) {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEndpointModal, setShowEndpointModal] = useState(false);
  const [elements, setElements] = useState<ElementType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    reloadEndpoints(languageUuid, reificationUuid);
    loadElements(languageUuid);
  }, [languageUuid, reificationUuid]);

  const loadElements = async (languageUuid: string) => {
    try {
      const response = await queryLanguageElementTypes(languageUuid);
      setElements(response.data || []);
    } catch (error) {
      console.error('Failed to fetch elements:', error);
      setElements([]);
    }
  };

  const reloadEndpoints = async (languageUuid: string, reificationUuid: string)=>{
     await queryReificationTypeEndpoints(languageUuid, reificationUuid)
      .then(response => setEndpoints(response.data || []))
      .catch(error => {
        console.error('Failed to fetch endpoints:', error);
        setEndpoints([]);
      })
      .finally(() => setIsLoading(false));
  }

  const handleEndpointNameChange = (uuid: string, newName: string) => {
    const updatedEndpoints = endpoints.map(ep => 
      ep.uuid === uuid ? { ...ep, name: newName } : ep
    );
    setEndpoints(updatedEndpoints);
    updateReificationTypeEndpoint(languageUuid, reificationUuid, uuid, { name: newName });
  };

  const handleArityChange = (uuid: string, newArity: number) => {
    const updatedEndpoints = endpoints.map(ep => 
      ep.uuid === uuid ? { ...ep, arity: newArity } : ep
    );
    setEndpoints(updatedEndpoints);
    updateReificationTypeEndpoint(languageUuid, reificationUuid, uuid, { arity: newArity });
  };

  const handleAddElement = async (endpoint, element) => {
    console.log("Add element to endpoint:", endpoint.uuid, element.uuid);
    const existingElementUuids = endpoint.elementTypes?.map(et => et.uuid) || [];
    setIsLoading(true);
    await updateReificationTypeEndpoint(languageUuid, reificationUuid, endpoint.uuid, { elementTypes: [...existingElementUuids, element.uuid] });
    reloadEndpoints(languageUuid, reificationUuid);
  };

  const handleRemoveElement = async (endpoint, element) => {
    console.log("Remove element from endpoint:", element.uuid);
    const ElementUuids = endpoint.elementTypes?.filter(et => et.uuid !== element.uuid).map(et => et.uuid) || [];
    console.log(ElementUuids);
    setIsLoading(true);
    await updateReificationTypeEndpoint(languageUuid, reificationUuid, endpoint.uuid, { elementTypes: [...ElementUuids] });
    reloadEndpoints(languageUuid, reificationUuid);
  };

  const handleAddEndpoint = () => {
    setShowEndpointModal(true)
  }

  const handleDeleteEndpoint = async (uuid :string) => {
    console.log("delete Endpoint :", uuid);
    setIsLoading(true);
    await deleteReificationTypeEndpoint(languageUuid, reificationUuid, uuid);
    reloadEndpoints(languageUuid, reificationUuid);
  }

  const addEndpoint = async (name:string, arity:number) => {
    console.log("add Endpoint", languageUuid, reificationUuid, name, arity)
    await createReificationTypeEndpoint(languageUuid, reificationUuid,{reificationTypeId: reificationUuid, name, arity});
    setIsLoading(true);
    setShowEndpointModal(false);
    reloadEndpoints(languageUuid, reificationUuid);
  }

  return (
    <div className="d-flex flex-column gap-3">
      {isLoading ? (
        <div className="d-flex justify-content-center py-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        endpoints.map((endpoint) => (
          <Row key={endpoint.uuid} className="align-items-center g-2">
            <EndpointRow 
              endpoint={endpoint} 
              onNameChange={handleEndpointNameChange}
              onArityChange={handleArityChange}
              onAddElement={handleAddElement}
              onRemoveElement={handleRemoveElement}
              onDeleteEndpoint={handleDeleteEndpoint}
              availableElements={elements}
            />
          </Row>
        ))
      )}
        <div className="d-flex justify-content-end mt-2">
              <Button variant="outline-primary" size="sm" onClick={handleAddEndpoint}>
                <Plus className="me-1" /> Add Endpoint
              </Button>
        </div>
        <EndpointCreationModal
          show={showEndpointModal}
          onHide={() => setShowEndpointModal(false)}
          onConfirm={addEndpoint}
        />
      </div>
  );
}
