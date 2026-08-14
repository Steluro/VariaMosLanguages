import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';
// import { queryRelationTypeEndpoints, createRelationTypeEndpoint, updateRelationTypeEndpoint, deleteRelationTypeEndpoint } from '../../../../DataProvider/Services/reificatonTypeEndpoints.service';
import { queryLanguageElementTypes } from '../../../../DataProvider/Services/elementType.service';
import { EndpointRow } from './EndpointRow';
import { ElementType } from '../../../../Domain/ProductLineEngineering/Entities/ElementType';
import { RelationType } from '../../../../Domain/ProductLineEngineering/Entities/RelationType';

interface RelationEndpointsProps {
  relation: RelationType
}
export function RelationEndpointsEdition({ relation }: RelationEndpointsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [elements, setElements] = useState<ElementType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    loadElements(relation.languageId);
  }, [relation]);

  const loadElements = async (languageUuid: string) => {
    try {
      const response = await queryLanguageElementTypes(languageUuid);
      setElements(response.data || []);
    } catch (error) {
      console.error('Failed to fetch elements:', error);
      setElements([]);
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
              elementType={relation.sources}
              endpointName='Sources'
              availableElements={elements}
            />
          </Row>
          <Row className="align-items-center g-2">
            <EndpointRow 
              elementType={relation.targets}
              endpointName='Targets'
              availableElements={elements}
            />
          </Row>
          </>
      )}
      </div>
  );
}
