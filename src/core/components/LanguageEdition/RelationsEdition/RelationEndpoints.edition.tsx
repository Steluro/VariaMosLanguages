import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';
// import { queryRelationTypeEndpoints, createRelationTypeEndpoint, updateRelationTypeEndpoint, deleteRelationTypeEndpoint } from '../../../../DataProvider/Services/reificatonTypeEndpoints.service';
import { queryLanguageElementTypes } from '../../../../DataProvider/Services/elementType.service';
import { EndpointRow } from './EndpointRow';
import { ElementType } from '../../../../Domain/ProductLineEngineering/Entities/ElementType';
import { RelationType } from '../../../../Domain/ProductLineEngineering/Entities/RelationType';
import { updateRelation, queryRelationById } from '../../../../DataProvider/Services/relationType.service';

/**
 * Props for the RelationEndpointsEdition component
 * @interface RelationEndpointsProps
 * @property {RelationType} relation - The relation type to display
 */
interface RelationEndpointsProps {
  relation: RelationType
}

/**
 * Component for managing relation endpoints (sources and targets)
 * Handles adding and removing element types to source and target endpoints
 * @param {RelationEndpointsProps} props - The component props
 * @returns {JSX.Element} The rendered relation endpoints component
 */
export function RelationEndpointsEdition({ relation }: RelationEndpointsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [elements, setElements] = useState<ElementType[]>([]);
  const [relationtype, setRelationtype] = useState<RelationType>(relation);

  useEffect(() => {
    setIsLoading(true);
    loadElements(relation.languageId);
    loadRelation(relation.uuid);
  }, [relation]);

  /**
   * Handle adding an element to source endpoint
   * @param {ElementType} elementType - The element type to add
   */
  const handleAddSourceElement = async (elementType: ElementType) => {
    const existingElementUuids = relationtype.sources?.map(et => et.uuid) || [];
    setIsLoading(true);
    await updateRelation(relation.languageId, relation.uuid, { sources: [...existingElementUuids, elementType.uuid ]});
    loadRelation(relation.uuid);
  }

  /**
   * Handle removing an element from source endpoint
   * @param {ElementType} elementType - The element type to remove
   */
  const handleRemoveSourceElement = async(elementType: ElementType) => {
    const ElementUuids = relationtype.sources?.filter(et => et.uuid !== elementType.uuid).map(et => et.uuid) || [];
    setIsLoading(true);
    await updateRelation(relation.languageId, relation.uuid, { sources: [...ElementUuids] });
    loadRelation(relation.uuid);
  }

  /**
   * Handle adding an element to target endpoint
   * @param {ElementType} elementType - The element type to add
   */
    const handleAddTargetElement = async (elementType: ElementType) => {
    const existingElementUuids = relationtype.targets?.map(et => et.uuid) || [];
    setIsLoading(true);
    await updateRelation(relation.languageId, relation.uuid, { targets: [...existingElementUuids, elementType.uuid ]});
    loadRelation(relation.uuid);
  }

  /**
   * Handle removing an element from target endpoint
   * @param {ElementType} elementType - The element type to remove
   */
  const handleRemoveTargetElement = async (elementType: ElementType) => {
    const ElementUuids = relationtype.targets?.filter(et => et.uuid !== elementType.uuid).map(et => et.uuid) || [];
    setIsLoading(true);
    await updateRelation(relation.languageId, relation.uuid, { targets: [...ElementUuids] });
    loadRelation(relation.uuid);
  }

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
   * Load relation data from the server
   * @param {string} relationUuid - The relation UUID
   */
  const loadRelation = async (relationUuid: string) => {
    try {
      const response = await queryRelationById(relation.languageId, relationUuid);
      setRelationtype(response.data || []);
    } catch (error) {
      console.error('Failed to fetch relation:', error);
      setRelationtype(relation);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      {isLoading ? (
        <div className="d-flex justify-content-center py-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (<>   
          <Row  className="align-items-center g-2">
            <EndpointRow 
              elementType={relationtype.sources}
              endpointName='Sources'
              availableElements={elements}
              onAddElement={handleAddSourceElement}
              onRemoveElement={handleRemoveSourceElement}
            />
          </Row>
          <Row className="align-items-center g-2">
            <EndpointRow 
              elementType={relationtype.targets}
              endpointName='Targets'
              availableElements={elements}
              onAddElement={handleAddTargetElement}
              onRemoveElement={handleRemoveTargetElement}
            />
          </Row>
          </>
      )}
      </div>
  );
}
