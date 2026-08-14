import { useState } from "react";
import { Col, Row, Button , Form} from "react-bootstrap";
import styles from "./RelationAccordionBody.module.css";
import { RelationShapeImage } from "./RelationShapeImage.edition";
import { ConstraintsEdition } from "../ConstraintsEdition/Constraints.edition";
import { updateRelation } from "../../../../DataProvider/Services/relationType.service";
import { PropertiesEdition } from "../PropertiesEdition/Properties.edition";
import { Trash } from "react-bootstrap-icons";
import { RelationEndpointsEdition } from "./RelationEndpoints.edition";

interface RelationAccordionBodyProps {
  relation: any;
  setToDeleteRelationUuid: (uuid: string) => void;
}

export function RelationAccordionBody({
  relation,
  setToDeleteRelationUuid,
}: RelationAccordionBodyProps) {
  const [relationName, setRelationName] = useState(relation.name||"Untitled");
  const [relationDescription, setRelationDescription] = useState(relation.description||"No description");
  const handleRelationDeletion = () => {
    setToDeleteRelationUuid(relation.uuid);
  };

  const handleBlurRelationName = (name: string) => {
      updateRelation(relation.languageId, relation.uuid, { name });
    };
  
    const handleBlurRelationDescription = (description: string) => {
      updateRelation(relation.languageId, relation.uuid, { description });
    };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <RelationShapeImage style={relation.style} />
        </div>
        <div className={styles.info}>
          <Form.Control
            type="text"
            value={relationName}
            onChange={(e) => setRelationName(e.target.value)}
            onBlur={(e) => handleBlurRelationName(e.target.value)}
            className={styles.sectionTitle}
          />
          <Form.Control
            as="textarea"
            value={relationDescription}
            onChange={(e) => setRelationDescription(e.target.value)}
            onBlur={(e) => handleBlurRelationDescription(e.target.value)}
            className={styles.description}
          />
        </div>
      </div>
      <div className={styles.details}>
        <Row>
          <Col md={6}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {relation.properties ? (
                 <PropertiesEdition
                     properties={relation.properties}
                     languageId={relation.languageId}
                     objectUuid={relation.uuid}
                     updateFunction={updateRelation}
                    />
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
                <ConstraintsEdition
                  constraints={relation.constraint}
                  languageId={relation.languageId}
                  elementUuid={relation.uuid}
                  updateFunction={updateRelation}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={styles.details}>
          <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Endpoints</h4>
              <div className={styles.content}>
                <RelationEndpointsEdition languageUuid={relation.languageId} relationUuid={relation.uuid} />
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
