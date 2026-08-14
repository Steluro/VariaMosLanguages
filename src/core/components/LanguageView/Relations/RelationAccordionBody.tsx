import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './RelationAccordionBody.module.css';
import { RelationShapeImage } from './RelationShapeImage';
import { RelationPropertieCard } from './RelationPropertieCard';
import { Constraints } from '../Constraints/Constraints';
import { RelationType } from '../../../../Domain/ProductLineEngineering/Entities/RelationType';

interface RelationAccordionBodyProps {
  relation: RelationType;
}

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
      </div>
    </div>
  );
}
