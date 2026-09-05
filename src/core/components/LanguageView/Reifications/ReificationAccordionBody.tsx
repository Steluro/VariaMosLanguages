import React, { useState, useEffect } from 'react';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Infinity } from 'react-bootstrap-icons';
import styles from './ReificationAccordionBody.module.css';
import { ReificationViewImage } from './ReificationViewImage';
import { ReificationPropertieCard } from './ReificationPropertieCard';
import { queryReificationTypeEndpoints } from '../../../../DataProvider/Services/reificatonTypeEndpoints.service';
import { Constraints } from '../Constraints/Constraints';
import { ReificationType } from '../../../../Domain/ProductLineEngineering/Entities/ReificationType';
import { ReificationTypeEndpoint } from '../../../../Domain/ProductLineEngineering/Entities/ReificationTypeEndpoint';
import { EndpointStyleView } from './EndpointStyleView';

/**
 * Props for the ReificationAccordionBody component
 * @interface RelationAccordionBodyProps
 * @property {ReificationType} reification - The reification type to display
 */
interface RelationAccordionBodyProps {
  reification: ReificationType;
}

/**
 * Accordion body component for displaying reification type details
 * Shows reification image, name, description, properties, constraints, and endpoints
 * @param {RelationAccordionBodyProps} props - The component props
 * @returns {JSX.Element} The rendered reification accordion body
 */
export function ReificationAccordionBody({ reification }: RelationAccordionBodyProps) {
  const [endpoints, setEndpoints] = useState<ReificationTypeEndpoint[]>([]);

  /**
   * Fetch endpoints when reification changes
   */
  useEffect(() => {
    queryReificationTypeEndpoints(reification.languageId, reification.uuid)
      .then(response => {console.log(response);setEndpoints(response.data || [])})
      .catch(error => {
        console.error('Failed to fetch endpoints:', error);
        setEndpoints([]);
      });
    console.log(endpoints);
  }, [reification.languageId, reification.uuid]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <ReificationViewImage reification={reification} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{reification.name}</h3>
          <p className={styles.description}>{reification.description}</p>
        </div>
      </div>
      <div className={styles.details}>
        <Row>
          <Col md={5}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {reification.properties && Object.keys(reification.properties).length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {Object.entries(reification.properties).map(([name, value]: [string, any]) => (
                      <ReificationPropertieCard
                        key={name}
                        name={name}
                        type={value?.type || 'unknown'}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted" style={{ margin: 0 }}>No properties</p>
                )}
              </div>
            </div>
          </Col>  
          <Col md={7}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Constraints</h4>
              <div className={styles.content}>
                {(reification.constraint.length>0) ? (
                  <Constraints code={reification.constraint} />
                ) : (
                  <p className="text-muted" style={{ margin: 0 }}>No constraints</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
           <Col md={12} className={styles.details}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Endpoints</h4>
              <div className={styles.content}>
                {endpoints.length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {endpoints.map((endpoint) => (
                      <Row key={endpoint.uuid} className="align-items-center g-2">
                        <Col xs="auto">
                        <EndpointStyleView endpoint={endpoint} />
                        </Col>
                        <Col xs={3}>
                          <span className="fw-bold">{endpoint.name}</span>
                        </Col>
                        <Col xs="auto">
                          <span className="text-primary">
                            Arity : {endpoint.arity === -1 ? <Infinity /> : endpoint.arity}</span>
                        </Col>
                        <Col className="d-flex flex-wrap gap-2">
                          {endpoint.elementTypes.map((elementType) => (
                            <OverlayTrigger
                              key={elementType.uuid}
                              placement="top"
                              overlay={<Tooltip>{elementType.description}</Tooltip>}
                            >
                              <div className="d-flex align-items-center gap-2 bg-white border rounded p-2" style={{ height: '38px' }}>
                                <span>{elementType.name}</span>
                              </div>
                            </OverlayTrigger>
                          ))}
                        </Col>
                      </Row>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted" style={{ margin: 0 }}>No endpoints</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
