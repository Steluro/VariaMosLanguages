import { useState, useEffect } from "react";
import {  Accordion, Spinner, Button } from "react-bootstrap";
import {
  createElementType,
  deleteElementType,
  queryLanguageElementTypes,
} from "../../../../DataProvider/Services/elementType.service";
import { PlusCircle } from "react-bootstrap-icons";
import styles from "./ElementTypeContainer.module.css";
import { ElementAccordionBody } from "./ElementAccordionBody.edition";
import CreationModal from "../CreationModal";
import ConfirmationModal from "../../ConfirmationModal";
import { ElementType } from "../../../../Domain/ProductLineEngineering/Entities/ElementType";
import { set } from "immer/dist/internal";

/**
 * Props for the ElementEditionTypeContainer component
 * @interface ElementContainerProps
 * @property {string} languageUuid - The UUID of the language
 */
interface ElementContainerProps {
  languageUuid: string;
}

/**
 * Container component for managing element types
 * Handles creation, deletion, and display of element types in an accordion format
 * @param {ElementContainerProps} props - The component props
 * @returns {JSX.Element} The rendered element type container component
 */
export function ElementEditionTypeContainer({
  languageUuid,
}: ElementContainerProps) {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [loading, setLoading] = useState(true);
  const [creationModal, setCreationModal] = useState(false);
  const [deletionModal, setDeletionModal] = useState(false);
  const [toDeleteElementUuid, setToDeleteElementUuid] = useState<string>(null);

  /**
   * Fetch element types when language UUID changes
   */
  useEffect(() => {
    setLoading(true);
    queryLanguageElementTypes(languageUuid).then((response) => {
      setElements(response.data || []);
      setLoading(false);
    });
  }, [languageUuid]);

  /**
   * Show deletion modal when element UUID to delete is set
   */
  useEffect(() => {
    if (toDeleteElementUuid) {
      setDeletionModal(true);
    }
  }, [toDeleteElementUuid]);

  /**
   * Trigger Prism syntax highlighting when accordion opens
   */
  const handleAccordionEnter = () => {
    // Trigger Prism syntax highlighting when accordion open
    if (typeof window !== "undefined" && (window as any).Prism) {
      setTimeout(() => {
        (window as any).Prism.highlightAll();
      }, 100);
    }
  };

  /**
   * Handle element type creation
   * @param {string} name - The name of the element type to create
   */
  const handleElementCreation = (name: string) => {
    setLoading(true);
    createElementType(languageUuid, {
      languageId: languageUuid,
      name: name,
    }).then((response) => {
      queryLanguageElementTypes(languageUuid).then((response) => {
        setElements(response.data || []);
        setLoading(false);
      });
    });
  };

  /**
   * Handle element type deletion confirmation
   */
  const handleConfirmDeletion = () => {
    setLoading(true);
    deleteElementType(languageUuid, toDeleteElementUuid).then((response) => {
      queryLanguageElementTypes(languageUuid).then((response) => {
        setElements(response.data || []);
        setLoading(false);
      });
    });
    setToDeleteElementUuid("");
    setDeletionModal(false);
  };

  return (
    <>
      <Button
        variant="primary"
        className={styles.accordionItemSpacing}
        onClick={() => setCreationModal(true)}
      >
        Add Element <PlusCircle className="ms-2" />
      </Button>
      {loading && (
        <div className="w-100 text-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      )}
      {!loading && elements.length === 0 && (
        <div className="text-muted">No elements</div>
      )}
      {!loading && elements.length > 0 && (
        <>
          {elements.map((element, index) => (
            <Accordion
              onSelect={handleAccordionEnter}
              className={styles.accordionItemSpacing}
              key={index}
            >
              <Accordion.Item eventKey={index.toString()}>
                  <ElementAccordionBody
                    element={element}
                    setToDeleteElementUuid={setToDeleteElementUuid}
                  />
              </Accordion.Item>
            </Accordion>
          ))}
        </>
      )}
      <CreationModal
        show={creationModal}
        objectName="Element"
        onHide={() => {
          setCreationModal(false);
        }}
        onCreate={handleElementCreation}
      />
      <ConfirmationModal
        show={deletionModal}
        onCancel={() => {setDeletionModal(false); setToDeleteElementUuid(null)}}
        onConfirm={handleConfirmDeletion}
        message="Are your sure you want to delete this element?"
        confirmButtonVariant="danger"
      />
    </>
  );
}
