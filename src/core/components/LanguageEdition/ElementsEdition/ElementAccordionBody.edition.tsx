import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import styles from "./ElementAccordionBody.module.css";
import { ElementEditionImage } from "./ElemenImage.edition";
import { PropertiesEdition } from "../PropertiesEdition/Properties.edition";
import { updateElement } from "../../../../DataProvider/Services/elementType.service";
import { ConstraintsEdition } from "../ConstraintsEdition/Constraints.edition";
import { Trash } from "react-bootstrap-icons";
import { ElementType } from "../../../../Domain/ProductLineEngineering/Entities/ElementType";

interface ElementAccordionBodyProps {
  element: ElementType;
  setToDeleteElementUuid: (uuid: string) => void;
}

export function ElementAccordionBody({
  element,
  setToDeleteElementUuid,
}: ElementAccordionBodyProps) {
  const [elementName, setElementName] = useState(element.name || "Untitled");
  const [elementDescription, setElementDescription] = useState(
    element.description || "No description",
  );
  const handleBlurElementName = (name: string) => {
    updateElement(element.languageId, element.uuid, { name });
  };

  const handleBlurElementDescription = (description: string) => {
    updateElement(element.languageId, element.uuid, { description });
  };

  const handleElementDeletion = () => {
    setToDeleteElementUuid(element.uuid);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <ElementEditionImage element={element} />
        </div>
        <div className={styles.info}>
          <Form.Control
            type="text"
            value={elementName}
            onChange={(e) => setElementName(e.target.value)}
            onBlur={(e) => handleBlurElementName(e.target.value)}
            className={styles.sectionTitle}
          />
          <Form.Control
            as="textarea"
            value={elementDescription}
            onChange={(e) => setElementDescription(e.target.value)}
            onBlur={(e) => handleBlurElementDescription(e.target.value)}
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
                {element.properties ? (
                  <PropertiesEdition
                    properties={element.properties}
                    languageId={element.languageId}
                    objectUuid={element.uuid}
                    updateFunction={updateElement}
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
                  constraints={element.constraint}
                  languageId={element.languageId}
                  elementUuid={element.uuid}
                  updateFunction={updateElement}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles.deleteButton}>
          <Button
            variant="outline-danger"
            onClick={() => {
              handleElementDeletion();
            }}
          >
            Delete Element
            <Trash className="ms-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
