import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ElementAccordionBody.module.css';
import { ElementShapeImage } from './ElementShapeImage';

interface ElementAccordionBodyProps {
  element: any;
}

export function ElementAccordionBody({ element }: ElementAccordionBodyProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <ElementShapeImage style={element.style} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{element.name}</h3>
          <p className={styles.description}>{element.description}</p>
        </div>
      </div>
      <div className={styles.details}>
        <Row>
          <Col md={6}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {element.properties ? (
                  <pre><code className="language-javascript">
                    {JSON.stringify(element.properties, null, 2)}
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
                {element.constraints ? (
                  <pre><code className="language-javascript">
                    {JSON.stringify(element.constraints, null, 2)}
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
