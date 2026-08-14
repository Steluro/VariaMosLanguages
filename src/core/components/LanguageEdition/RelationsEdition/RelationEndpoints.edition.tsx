import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';
// import { queryRelationTypeEndpoints, createRelationTypeEndpoint, updateRelationTypeEndpoint, deleteRelationTypeEndpoint } from '../../../../DataProvider/Services/reificatonTypeEndpoints.service';
import { queryLanguageElementTypes } from '../../../../DataProvider/Services/elementType.service';
import { EndpointRow } from './EndpointRow';
import { ElementType } from '../../../../Domain/ProductLineEngineering/Entities/ElementType';
import { RelationType } from '../../../../Domain/ProductLineEngineering/Entities/RelationType';
import { updateRelation, queryRelationById } from '../../../../DataProvider/Services/relationType.service';

interface RelationEndpointsProps {
  relation: RelationType
}
export function RelationEndpointsEdition({ relation }: RelationEndpointsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [elements, setElements] = useState<ElementType[]>([]);
  const [relationtype, setRelationtype] = useState<RelationType>(relation);

  useEffect(() => {
    setIsLoading(true);
    loadElements(relation.languageId);
    loadRelation(relation.uuid);
  }, [relation]);

  const handleAddSourceElement = async (elementType: ElementType) => {
    const existingElementUuids = relationtype.sources?.map(et => et.uuid) || [];
    setIsLoading(true);
    await updateRelation(relation.languageId, relation.uuid, { sources: [...existingElementUuids, elementType.uuid ]});
    loadRelation(relation.uuid);
  }

  const handleRemoveSourceElement = async(elementType: ElementType) => {
    const ElementUuids = relationtype.sources?.filter(et => et.uuid !== elementType.uuid).map(et => et.uuid) || [];
    setIsLoading(true);
    await updateRelation(relation.languageId, relation.uuid, { sources: [...ElementUuids] });
    loadRelation(relation.uuid);
  }

    const handleAddTargetElement = async (elementType: ElementType) => {
    const existingElementUuids = relationtype.targets?.map(et => et.uuid) || [];
    setIsLoading(true);
    await updateRelation(relation.languageId, relation.uuid, { targets: [...existingElementUuids, elementType.uuid ]});
    loadRelation(relation.uuid);
  }

  const handleRemoveTargetElement = async (elementType: ElementType) => {
    const ElementUuids = relationtype.targets?.filter(et => et.uuid !== elementType.uuid).map(et => et.uuid) || [];
    setIsLoading(true);
    await updateRelation(relation.languageId, relation.uuid, { targets: [...ElementUuids] });
    loadRelation(relation.uuid);
  }

  const loadElements = async (languageUuid: string) => {
    try {
      const response = await queryLanguageElementTypes(languageUuid);
      setElements(response.data || []);
    } catch (error) {
      console.error('Failed to fetch elements:', error);
      setElements([]);
    }
  };

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
