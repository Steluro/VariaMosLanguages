import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ReificationAccordionBody.module.css';
import { RelationShapeImage } from './ReificationShapeImage';

interface RelationAccordionBodyProps {
  reification: any;
}

export function ReificationAccordionBody({ reification }: RelationAccordionBodyProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <RelationShapeImage style={reification.style} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{reification.name}</h3>
          <p className={styles.description}>{reification.description}</p>
        </div>
      </div>
      <div className={styles.details}>
        <Row>
          <Col md={6}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {reification.properties ? (
                  <pre><code className="language-javascript">
                    {JSON.stringify(reification.properties, null, 2)}
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
                {reification.constraints ? (
                  <pre><code className="language-javascript">
                    {JSON.stringify(reification.constraints, null, 2)}
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
