import React from 'react';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './RelationAccordionBody.module.css';
import { RelationShapeImage } from './RelationShapeImage';
import { RelationPropertieCard } from './RelationPropertieCard';
import { Constraints } from '../Constraints/Constraints';
import { RelationType } from '../../../../Domain/ProductLineEngineering/Entities/RelationType';

/**
 * Props for the RelationAccordionBody component
 * @interface RelationAccordionBodyProps
 * @property {RelationType} relation - The relation type to display
 */
interface RelationAccordionBodyProps {
  relation: RelationType;
}

/**
 * Accordion body component for displaying relation type details
 * Shows relation image, name, description, properties, constraints, sources, and targets
 * @param {RelationAccordionBodyProps} props - The component props
 * @returns {JSX.Element} The rendered relation accordion body
 */
export function RelationAccordionBody({ relation }: RelationAccordionBodyProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <RelationShapeImage style={relation.style} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{relation.name}</h3>
          <p className={styles.description}>{relation.description}</p>
        </div>
      </div>
      <div className={styles.details}>
        <Row>
          <Col md={5}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {relation.properties && Object.keys(relation.properties).length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {Object.entries(relation.properties).map(([name, value]: [string, any]) => (
                      <RelationPropertieCard
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
                {(relation.constraint.length>0) ? (
                  <Constraints code={relation.constraint} />
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
              <h4 className={styles.sectionTitle}>Sources</h4>
              <div className={styles.content}>
                {relation.sources && relation.sources.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {relation.sources.map((elementType) => (
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
                  </div>
                ) : (
                  <p className="text-muted" style={{ margin: 0 }}>No sources</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={styles.details}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Targets</h4>
              <div className={styles.content}>
                {relation.targets && relation.targets.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {relation.targets.map((elementType) => (
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
                  </div>
                ) : (
                  <p className="text-muted" style={{ margin: 0 }}>No targets</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
