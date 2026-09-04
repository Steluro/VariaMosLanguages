import { useState, useEffect } from "react";
import { Accordion, Col, Row, Form, Button } from "react-bootstrap";
import styles from "./ReificationAccordionBody.module.css";
import { ReificationEditionImage } from "./ReificationImage.edition";
import { PropertiesEdition } from "../PropertiesEdition/Properties.edition";
import { queryReificationTypeEndpoints } from "../../../../DataProvider/Services/reificatonTypeEndpoints.service";
import { updateReificationType, getReificationType } from "../../../../DataProvider/Services/reificationType.service";
import { ConstraintsEdition}  from "../ConstraintsEdition/Constraints.edition";
import { Trash } from "react-bootstrap-icons";
import { ReificationEndpointsEdition } from "./Endpoints/ReificationEndpoints.edition";
import { ReificationType } from "../../../../Domain/ProductLineEngineering/Entities/ReificationType";
import { ReificationTypeEndpoint } from "../../../../Domain/ProductLineEngineering/Entities/ReificationTypeEndpoint";

/**
 * Props for the ReificationAccordionBodyEdition component
 * @interface ReificationAccordionBodyProps
 * @property {ReificationType} reification - The reification type to display
 * @property {(uuid: string) => void} setToDeleteReificationUuid - Callback to set the UUID of reification to delete
 */
interface ReificationAccordionBodyProps {
  reification: ReificationType;
  setToDeleteReificationUuid : (uuid : string) => void;
}

/**
 * Accordion body component for editing reification type details
 * Displays reification image, name, description, properties, constraints, and endpoints
 * @param {RelationAccordionBodyProps} props - The component props
 * @returns {JSX.Element} The rendered reification accordion body component
 */
export function ReificationAccordionBodyEdition({
  reification,
  setToDeleteReificationUuid,
}: ReificationAccordionBodyProps) {
  const [accordionReification, setAccordionReification] = useState<ReificationType>(reification);
  const [endpoints, setEndpoints] = useState<ReificationTypeEndpoint[]>([]);
  const [reificationName, setReifificationName] = useState(reification.name || "Untitled");
  const [reificationDescription, setReificationDescription] =
    useState(reification.description);

  /**
   * Fetch endpoints when reification changes
   */
  useEffect(() => {
    queryReificationTypeEndpoints(reification.languageId, reification.uuid)
      .then((response) => {
        console.log(response);
        setEndpoints(response.data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch endpoints:", error);
        setEndpoints([]);
      });
    console.log(endpoints);
  }, [reification.languageId, reification.uuid]);

  /**
   * Handle reification name update on blur event
   * @param {string} name - The new reification name
   */
  const handleBlurReificationName = async (name: string) => {
    await updateReificationType(reification.languageId, reification.uuid, { name });
    await getReificationType(accordionReification.languageId, reification.uuid).then((response) => {
      setAccordionReification(response.data);
    });
  };

  /**
   * Handle reification description update on blur event
   * @param {string} description - The new reification description
   */
  const handleBlurReificationtDescription = async (description: string) => {
    await updateReificationType(reification.languageId, reification.uuid, { description });
    await getReificationType(accordionReification.languageId, reification.uuid).then((response) => {
      setAccordionReification(response.data);
    });
  };

  /**
   * Generic update function for reification properties
   * @param {string} languageId - The language ID
   * @param {string} objectUuid - The reification UUID
   * @param {Partial<{name: string; description: string; style: Record<string, unknown>; properties: Record<string, unknown>; constraint: string;}>} data - The data to update
   * @returns {Promise<any>} The update response
   */
  const updateFunction = async(languageId: string, objectUuid: string, data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
  }>) => {
    const response = await updateReificationType(languageId, objectUuid, data);
    await getReificationType(accordionReification.languageId, reification.uuid).then((res) => {
      setAccordionReification(res.data);
    });
    return response;
  };

  /**
   * Handle reification deletion request
   */
  const handleReificationDeletion = () => {
    setToDeleteReificationUuid(reification.uuid);
  };

  return (
    <>
    <Accordion.Header>
      <div>{accordionReification.name}</div>
    </Accordion.Header>
    <Accordion.Body>
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <ReificationEditionImage reification={accordionReification} />
        </div>
        <div className={styles.info}>
          <Form.Control
            type="text"
            value={reificationName}
            onChange={(e) => setReifificationName(e.target.value)}
            onBlur={(e) => handleBlurReificationName(e.target.value)}
            className={styles.sectionTitle}
          />
          <Form.Control
            as="textarea"
            value={reificationDescription}
            onChange={(e) => setReificationDescription(e.target.value)}
            onBlur={(e) => handleBlurReificationtDescription(e.target.value)}
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
                {accordionReification.properties ? (
                  <PropertiesEdition
                    properties={accordionReification.properties}
                    languageId={accordionReification.languageId}
                    objectUuid={accordionReification.uuid}
                    updateFunction={updateFunction}
                  />
                ) : (
                  <p className="text-muted" style={{ margin: 0 }}>
                    No properties
                  </p>
                )}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Constraints</h4>
              <div className={styles.content}>
                <ConstraintsEdition
                  constraints={accordionReification.constraint}
                  languageId={accordionReification.languageId}
                  elementUuid={accordionReification.uuid}
                  updateFunction={updateFunction}
                />
              </div>
            </div>
          </Col>
        </Row>
         <Col md={12} className={styles.details}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Endpoints</h4>
              <div className={styles.content}>
                  <ReificationEndpointsEdition
                    languageUuid={accordionReification.languageId}
                    reificationUuid={accordionReification.uuid}
                  />
              </div>
            </div>
          </Col>
        <div className={styles.deleteButton}>
          <Button
            variant="outline-danger"
            onClick={() => {
              handleReificationDeletion();
            }}
          >
            Delete Reification
            <Trash className="ms-2" />
          </Button>
        </div>
      </div>
    </div>
    </Accordion.Body>
    </>
  );
}
