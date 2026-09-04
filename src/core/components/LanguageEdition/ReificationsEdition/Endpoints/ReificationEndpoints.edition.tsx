import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';
import { queryReificationTypeEndpoints, createReificationTypeEndpoint, updateReificationTypeEndpoint, deleteReificationTypeEndpoint } from '../../../../../DataProvider/Services/reificatonTypeEndpoints.service';
import { queryLanguageElementTypes } from '../../../../../DataProvider/Services/elementType.service';
import { EndpointCreationModal } from './EndpointCreationModal';
import { EndpointRow } from './EndpointRow';
import { set } from 'immer/dist/internal';
import { ReificationTypeEndpoint } from '../../../../../Domain/ProductLineEngineering/Entities/ReificationTypeEndpoint';
import { ElementType } from '../../../../../Domain/ProductLineEngineering/Entities/ElementType';

/**
 * Props for the ReificationEndpointsEdition component
 * @interface ReificationEndpointsProps
 * @property {string} reificationUuid - The UUID of the reification type
 * @property {string} languageUuid - The UUID of the language
 */
interface ReificationEndpointsProps {
  reificationUuid: string;
  languageUuid: string;
}

/**
 * Component for managing reification type endpoints
 * Handles creation, deletion, and editing of endpoints with their associated elements
 * @param {ReificationEndpointsProps} props - The component props
 * @returns {JSX.Element} The rendered reification endpoints component
 */
export function ReificationEndpointsEdition({ reificationUuid, languageUuid }: ReificationEndpointsProps) {
  const [endpoints, setEndpoints] = useState<ReificationTypeEndpoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEndpointModal, setShowEndpointModal] = useState(false);
  const [elements, setElements] = useState<ElementType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    reloadEndpoints(languageUuid, reificationUuid);
    loadElements(languageUuid);
  }, [languageUuid, reificationUuid]);

  /**
   * Load available element types for the language
   * @param {string} languageUuid - The language UUID
   */
  const loadElements = async (languageUuid: string) => {
    try {
      const response = await queryLanguageElementTypes(languageUuid);
      setElements(response.data || []);
    } catch (error) {
      console.error('Failed to fetch elements:', error);
      setElements([]);
    }
  };

  /**
   * Reload endpoints from the server
   * @param {string} languageUuid - The language UUID
   * @param {string} reificationUuid - The reification UUID
   */
  const reloadEndpoints = async (languageUuid: string, reificationUuid: string)=>{
     await queryReificationTypeEndpoints(languageUuid, reificationUuid)
      .then(response => setEndpoints(response.data || []))
      .catch(error => {
        console.error('Failed to fetch endpoints:', error);
        setEndpoints([]);
      })
      .finally(() => setIsLoading(false));
  }

  /**
   * Handle endpoint name change
   * @param {string} uuid - The endpoint UUID
   * @param {string} newName - The new name
   */
  const handleEndpointNameChange = (uuid: string, newName: string) => {
    const updatedEndpoints = endpoints.map(ep => 
      ep.uuid === uuid ? { ...ep, name: newName } : ep
    );
    setEndpoints(updatedEndpoints);
    updateReificationTypeEndpoint(languageUuid, reificationUuid, uuid, { name: newName });
  };

  /**
   * Handle endpoint arity change
   * @param {string} uuid - The endpoint UUID
   * @param {number} newArity - The new arity
   */
  const handleArityChange = (uuid: string, newArity: number) => {
    const updatedEndpoints = endpoints.map(ep => 
      ep.uuid === uuid ? { ...ep, arity: newArity } : ep
    );
    setEndpoints(updatedEndpoints);
    updateReificationTypeEndpoint(languageUuid, reificationUuid, uuid, { arity: newArity });
  };

  /**
   * Handle adding an element to an endpoint
   * @param {ReificationTypeEndpoint} endpoint - The endpoint
   * @param {ElementType} element - The element to add
   */
  const handleAddElement = async (endpoint : ReificationTypeEndpoint, element : ElementType) => {
    const existingElementUuids = endpoint.elementTypes?.map(et => et.uuid) || [];
    setIsLoading(true);
    await updateReificationTypeEndpoint(languageUuid, reificationUuid, endpoint.uuid, { elementTypes: [...existingElementUuids, element.uuid] });
    reloadEndpoints(languageUuid, reificationUuid);
  };

  /**
   * Handle removing an element from an endpoint
   * @param {ReificationTypeEndpoint} endpoint - The endpoint
   * @param {ElementType} element - The element to remove
   */
  const handleRemoveElement = async (endpoint :ReificationTypeEndpoint, element : ElementType) => {
    const ElementUuids = endpoint.elementTypes?.filter(et => et.uuid !== element.uuid).map(et => et.uuid) || [];
    setIsLoading(true);
    await updateReificationTypeEndpoint(languageUuid, reificationUuid, endpoint.uuid, { elementTypes: [...ElementUuids] });
    reloadEndpoints(languageUuid, reificationUuid);
  };

  /**
   * Handle showing the endpoint creation modal
   */
  const handleAddEndpoint = () => {
    setShowEndpointModal(true)
  }

  /**
   * Handle endpoint deletion
   * @param {string} uuid - The endpoint UUID to delete
   */
  const handleDeleteEndpoint = async (uuid :string) => {
    console.log("delete Endpoint :", uuid);
    setIsLoading(true);
    await deleteReificationTypeEndpoint(languageUuid, reificationUuid, uuid);
    reloadEndpoints(languageUuid, reificationUuid);
  }

  /**
   * Handle endpoint style change
   * @param {string} uuid - The endpoint UUID
   * @param {Record<string, unknown>} newStyle - The new style
   */
  const handleStyleChange = async (uuid: string, newStyle: Record<string, unknown>) => {
    const updatedEndpoints = endpoints.map(ep =>
      ep.uuid === uuid ? { ...ep, style: newStyle } : ep
    );
    setEndpoints(updatedEndpoints);
    await updateReificationTypeEndpoint(languageUuid, reificationUuid, uuid, { style: newStyle });
  };

  /**
   * Handle creating a new endpoint
   * @param {string} name - The endpoint name
   * @param {number} arity - The endpoint arity
   */
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
              onStyleChange={handleStyleChange}
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
