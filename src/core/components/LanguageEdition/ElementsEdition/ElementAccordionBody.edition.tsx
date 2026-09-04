import { useState } from "react";
import { Accordion, Col, Row, Form, Button } from "react-bootstrap";
import styles from "./ElementAccordionBody.module.css";
import { ElementEditionImage } from "./ElemenImage.edition";
import { PropertiesEdition } from "../PropertiesEdition/Properties.edition";
import { updateElement, getElement } from "../../../../DataProvider/Services/elementType.service";
import { ConstraintsEdition } from "../ConstraintsEdition/Constraints.edition";
import { Trash } from "react-bootstrap-icons";
import { ElementType } from "../../../../Domain/ProductLineEngineering/Entities/ElementType";

/**
 * Props for the ElementAccordionBody component
 * @interface ElementAccordionBodyProps
 * @property {ElementType} element - The element type to display
 * @property {(uuid: string) => void} setToDeleteElementUuid - Callback to set the UUID of element to delete
 */
interface ElementAccordionBodyProps {
  element: ElementType;
  setToDeleteElementUuid: (uuid: string) => void;
}

/**
 * Accordion body component for editing element type details
 * Displays element image, name, description, properties, and constraints
 * @param {ElementAccordionBodyProps} props - The component props
 * @returns {JSX.Element} The rendered element accordion body component
 */
export function ElementAccordionBody({
  element,
  setToDeleteElementUuid,
}: ElementAccordionBodyProps) {
  const [accordionElement, setAccordionElement] = useState<ElementType>(element);
  const [elementName, setElementName] = useState(element.name || "Untitled");
  const [elementDescription, setElementDescription] = useState(element.description);
  /**
   * Handle element name update on blur event
   * @param {string} name - The new element name
   */
  const handleBlurElementName = async (name: string) => {
    await updateElement(element.languageId, element.uuid, { name });
    await getElement(accordionElement.languageId, element.uuid).then((response) => {
      setAccordionElement(response.data);
    })
  };

  /**
   * Handle element description update on blur event
   * @param {string} description - The new element description
   */
  const handleBlurElementDescription = async (description: string) => {
    await updateElement(element.languageId, element.uuid, { description });
    await getElement(accordionElement.languageId, element.uuid).then((response) => {
      setAccordionElement(response.data);
    })
  };

  /**
   * Generic update function for element properties
   * @param {string} languageId - The language ID
   * @param {string} objectUuid - The element UUID
   * @param {Partial<{name: string; description: string; style: Record<string, unknown>; properties: Record<string, unknown>; constraint: string;}>} data - The data to update
   */
  const updateFunction = async(languageId: string, objectUuid: string, data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
  }>) =>{
    await updateElement(languageId, objectUuid, data);
    await getElement(accordionElement.languageId, element.uuid).then((response) => {
      setAccordionElement(response.data);
    })
  };

  /**
   * Handle element deletion request
   */
  const handleElementDeletion = () => {
    setToDeleteElementUuid(element.uuid);
  };
  return (
    <>
    <Accordion.Header>
      <div>{accordionElement.name}</div>
    </Accordion.Header>
    <Accordion.Body>
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <ElementEditionImage element={accordionElement} />
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
                {element.properties ? (
                  <PropertiesEdition
                    properties={accordionElement.properties}
                    languageId={accordionElement.languageId}
                    objectUuid={accordionElement.uuid}
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
    </Accordion.Body>
    </>
  );
}
