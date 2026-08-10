import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import styles from "./RelationAccordionBody.module.css";
import { RelationShapeImage } from "./RelationShapeImage.edition";
import { ConstraintsRelation } from "./ConstraintsRelation.edition";
import { Trash } from "react-bootstrap-icons";

interface RelationAccordionBodyProps {
  relation: any;
  setToDeleteRelationUuid: (uuid: string) => void;
}

export function RelationAccordionBody({
  relation,
  setToDeleteRelationUuid,
}: RelationAccordionBodyProps) {
  const handleRelationDeletion = () => {
    setToDeleteRelationUuid(relation.uuid);
  };

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
                  <pre>
                    <code className="language-javascript">
                      {JSON.stringify(relation.properties, null, 2)}
                    </code>
                  </pre>
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
                <ConstraintsRelation
                  constraints={relation.constraint}
                  languageId={relation.languageId}
                  elementUuid={relation.uuid}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles.deleteButton}>
          <Button
            variant="outline-danger"
            onClick={() => {
              handleRelationDeletion();
            }}
          >
            Delete Relation
            <Trash className="ms-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
