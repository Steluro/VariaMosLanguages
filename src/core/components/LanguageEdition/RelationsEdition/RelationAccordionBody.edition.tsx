import { useState } from "react";
import { Accordion, Col, Row, Button , Form} from "react-bootstrap";
import styles from "./RelationAccordionBody.module.css";
import { RelationShapeImage } from "./RelationShapeImage.edition";
import { ConstraintsEdition } from "../ConstraintsEdition/Constraints.edition";
import { updateRelation, getRelationType } from "../../../../DataProvider/Services/relationType.service";
import { PropertiesEdition } from "../PropertiesEdition/Properties.edition";
import { Trash } from "react-bootstrap-icons";
import { RelationEndpointsEdition } from "./RelationEndpoints.edition";
import { RelationType } from "../../../../Domain/ProductLineEngineering/Entities/RelationType";

interface RelationAccordionBodyProps {
  relation: RelationType;
  setToDeleteRelationUuid: (uuid: string) => void;
}

export function RelationAccordionBody({
  relation,
  setToDeleteRelationUuid,
}: RelationAccordionBodyProps) {
  const [accordionRelation, setAccordionRelation] = useState<RelationType>(relation);
  const [relationName, setRelationName] = useState(relation.name||"Untitled");
  const [relationDescription, setRelationDescription] = useState(relation.description);

  const handleBlurRelationName = async (name: string) => {
    await updateRelation(relation.languageId, relation.uuid, { name });
    await getRelationType(accordionRelation.languageId, relation.uuid).then((response) => {
      setAccordionRelation(response.data);
    });
  };

  const handleBlurRelationDescription = async (description: string) => {
    await updateRelation(relation.languageId, relation.uuid, { description });
    await getRelationType(accordionRelation.languageId, relation.uuid).then((response) => {
      setAccordionRelation(response.data);
    });
  };

  const updateFunction = async(languageId: string, objectUuid: string, data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
    sources: string[];
    targets: string[];
  }>) => {
    const response = await updateRelation(languageId, objectUuid, data);
    await getRelationType(accordionRelation.languageId, relation.uuid).then((res) => {
      setAccordionRelation(res.data);
    });
    return response;
  };

  const handleRelationDeletion = () => {
    setToDeleteRelationUuid(relation.uuid);
  };

  return (
    <>
    <Accordion.Header>
      <div>{accordionRelation.name}</div>
    </Accordion.Header>
    <Accordion.Body>
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <RelationShapeImage relation={accordionRelation} />
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
            placeholder="Enter a description"
          />
        </div>
      </div>
      <div className={styles.details}>
        <Row>
          <Col md={6}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {accordionRelation.properties ? (
                 <PropertiesEdition
                     properties={accordionRelation.properties}
                     languageId={accordionRelation.languageId}
                     objectUuid={accordionRelation.uuid}
                     updateFunction={updateFunction}
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
                  constraints={accordionRelation.constraint}
                  languageId={accordionRelation.languageId}
                  elementUuid={accordionRelation.uuid}
                  updateFunction={updateFunction}
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
                <RelationEndpointsEdition
                relation={accordionRelation} />
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
    </Accordion.Body>
    </>
  );
}
