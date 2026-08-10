import { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import styles from "./ReificationAccordionBody.module.css";
import { RelationShapeImage } from "./ReificationShapeImage.edition";
import { ReificationPropertieCard } from "./ReificationPropertieCard.edition";
import { queryReificationTypeEndpoints } from "../../../../DataProvider/Services/reificatonTypeEndpoints.service";
import { ConstraintsReification } from "./ConstraintsReification.edition";
import { Trash } from "react-bootstrap-icons";

interface RelationAccordionBodyProps {
  reification: any;
  setToDeleteReificationUuid : (uuid : string) => void;
}

export function ReificationAccordionBodyEdition({
  reification,
  setToDeleteReificationUuid,
}: RelationAccordionBodyProps) {
  const [endpoints, setEndpoints] = useState<any[]>([]);

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

  const handleReificationDeletion = () => {
    setToDeleteReificationUuid(reification.uuid);
  };

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
          <Col md={4}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Properties</h4>
              <div className={styles.content}>
                {reification.properties &&
                Object.keys(reification.properties).length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {Object.entries(reification.properties).map(
                      ([name, value]: [string, any]) => (
                        <ReificationPropertieCard
                          key={name}
                          name={name}
                          type={value?.type || "unknown"}
                        />
                      ),
                    )}
                  </div>
                ) : (
                  <p className="text-muted" style={{ margin: 0 }}>
                    No properties
                  </p>
                )}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Endpoints</h4>
              <div className={styles.content}>
                {endpoints.length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {endpoints.map((endpoint, index) => (
                      <div key={index}>{endpoint.name}</div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted" style={{ margin: 0 }}>
                    No endpoints
                  </p>
                )}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Constraints</h4>
              <div className={styles.content}>
                <ConstraintsReification
                  constraints={reification.constraint}
                  languageId={reification.languageId}
                  elementUuid={reification.uuid}
                />
              </div>
            </div>
          </Col>
        </Row>
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
  );
}
