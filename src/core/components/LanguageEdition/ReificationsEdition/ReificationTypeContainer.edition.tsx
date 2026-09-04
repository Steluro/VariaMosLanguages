import { useState, useEffect } from "react";
import { Accordion, Spinner, Button } from "react-bootstrap";
import {
  queryLanguageReificationTypes,
  createReificationType,
  deleteReificationType,
} from "../../../../DataProvider/Services/reificationType.service";
import { PlusCircle } from "react-bootstrap-icons";
import styles from "./ReificationTypeContainer.module.css";
import { ReificationAccordionBodyEdition } from "./ReificationAccordionBody.edition";
import CreationModal from "../CreationModal";
import ConfirmationModal from "../../ConfirmationModal";
import { queryReificationTypeEndpoints } from "../../../../DataProvider/Services/reificatonTypeEndpoints.service";
import { ReificationType } from "../../../../Domain/ProductLineEngineering/Entities/ReificationType";

/**
 * Props for the ReificationTypeContainerEdition component
 * @interface ReificationContainerProps
 * @property {string} languageUuid - The UUID of the language
 */
interface ReificationContainerProps {
  languageUuid: string;
}

/**
 * Container component for managing reification types
 * Handles creation, deletion, and display of reification types in an accordion format
 * @param {ReificationContainerProps} props - The component props
 * @returns {JSX.Element} The rendered reification type container component
 */
export function ReificationTypeContainerEdition({
  languageUuid,
}: ReificationContainerProps) {
  const [reifications, setReifications] = useState<ReificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [creationModal, setCreationModal] = useState(false);
  const [deletionModal, setDeletionModal] = useState(false);
  const [toDeleteReificationUuid, setToDeleteReificationUuid] = useState<string>(null);

  /**
   * Fetch reification types when language UUID changes
   */
  useEffect(() => {
    setLoading(true);
    queryLanguageReificationTypes(languageUuid)
      .then((response) => {
        setReifications(response.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [languageUuid]);

  /**
   * Show deletion modal when reification UUID to delete is set
   */
  useEffect(() => {
    if (toDeleteReificationUuid) {
      setDeletionModal(true);
    }
  }, [toDeleteReificationUuid]);

  /**
   * Trigger Prism syntax highlighting when accordion opens
   */
  const handleAccordionEnter = () => {
    // Trigger Prism syntax highlighting when accordion opens
    if (typeof window !== "undefined" && (window as any).Prism) {
      setTimeout(() => {
        (window as any).Prism.highlightAll();
      }, 100);
    }
  };

  /**
   * Handle reification type creation
   * @param {string} name - The name of the reification type to create
   */
  const handleReificationCreation = (name: string) => {
    setLoading(true);
    createReificationType(languageUuid, {
      languageId: languageUuid,
      name: name,
    }).then((response) => {
      queryLanguageReificationTypes(languageUuid).then((response) => {
        setReifications(response.data || []);
        setLoading(false);
      });
    });
  };

  /**
   * Handle reification type deletion confirmation
   */
  const handleConfirmDeletion = () => {
    setLoading(true);
    deleteReificationType(languageUuid, toDeleteReificationUuid).then((response) => {
      queryLanguageReificationTypes(languageUuid).then((response) => {
        setReifications(response.data || []);
        setLoading(false);
      });
    });
    setToDeleteReificationUuid("");
    setDeletionModal(false);
  };


  return (
    <><Button
      variant="primary"
      className={styles.accordionItemSpacing}
      onClick={() => setCreationModal(true)}
    >
      Add Reification <PlusCircle className="ms-2" />
    </Button>
      {loading && (
        <div className="w-100 text-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      )}
      {!loading && reifications.length === 0 && (
        <div className="text-muted">No reifications</div>
      )}
      {!loading && reifications.length > 0 && (
        <>
          {reifications.map((reification, index) => (
            <Accordion
              onSelect={handleAccordionEnter}
              className={styles.accordionItemSpacing}
              key={index}
            >
              <Accordion.Item eventKey={index.toString()}>
                <ReificationAccordionBodyEdition reification={reification} setToDeleteReificationUuid={setToDeleteReificationUuid} />
              </Accordion.Item>
            </Accordion>
          ))}
        </>
      )}
      <CreationModal
        show={creationModal}
        objectName="Reification"
        onHide={() => {
          setCreationModal(false);
        }}
        onCreate={handleReificationCreation}
      />
      <ConfirmationModal
        show={deletionModal}
        onCancel={() => {setDeletionModal(false); setToDeleteReificationUuid(null);}}
        onConfirm={handleConfirmDeletion}
        message="Are your sure you want to delete this reification?"
        confirmButtonVariant="danger"
      />
    </>
  );
}
