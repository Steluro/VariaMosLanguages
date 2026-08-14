import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ElementAccordionBody.module.css';
import { ElementShapeImage } from './ElementShapeImage';
import { ElementPropertieCard } from './ElementPropertieCard';
import { Constraints } from '../Constraints/Constraints';
import { ElementType } from '../../../../Domain/ProductLineEngineering/Entities/ElementType';

interface ElementAccordionBodyProps {
  element: ElementType;
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
          <Col md={5}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {element.properties && Object.keys(element.properties).length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {Object.entries(element.properties).map(([name, value]: [string, any]) => (
                      <ElementPropertieCard
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
                {element.constraint ? (
                  <Constraints code={element.constraint} />
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
