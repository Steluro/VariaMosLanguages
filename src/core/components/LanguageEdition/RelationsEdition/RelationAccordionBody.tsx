import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './RelationAccordionBody.module.css';
import { RelationShapeImage } from './RelationShapeImage';

interface RelationAccordionBodyProps {
  relation: any;
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
          <Col md={6}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {relation.properties ? (
                  <pre><code className="language-javascript">
                    {JSON.stringify(relation.properties, null, 2)}
                  </code></pre>
                ) : (
                  <p className="text-muted">No properties</p>
                )}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Constraints</h4>
              <div className={styles.content}>
                {relation.constraints ? (
                  <pre><code className="language-javascript">
                    {JSON.stringify(relation.constraints, null, 2)}
                  </code></pre>
                ) : (
                  <p className="text-muted">No constraints</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
