import React, { useState, useEffect } from "react";
import { Accordion, Spinner, Button } from "react-bootstrap";
import {
  queryLanguageRelationTypes,
  createRelationType,
  deleteRelationType,
} from "../../../../DataProvider/Services/relationType.service";
import styles from "./RelationTypeContainer.module.css";
import { RelationAccordionBody } from "./RelationAccordionBody.edition";
import ConfirmationModal from "../../ConfirmationModal";
import CreationModal from "../CreationModal";
import { PlusCircle } from "react-bootstrap-icons";

/**
 * Props for the RelationTypeContainer component
 * @interface RelationContainerProps
 * @property {string} languageUuid - The UUID of the language
 */
interface RelationContainerProps {
  languageUuid: string;
}

/**
 * Container component for managing relation types
 * Handles creation, deletion, and display of relation types in an accordion format
 * @param {RelationContainerProps} props - The component props
 * @returns {JSX.Element} The rendered relation type container component
 */
export function RelationTypeContainer({
  languageUuid,
}: RelationContainerProps) {
  const [relations, setRelations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletionModal, setDeletionModal] = useState(false);
  const [creationModal, setCreationModal] = useState(false);
  const [toDeleteRelationUuid, setToDeleteRelationUuid] =
    useState<string>(null);

  /**
   * Fetch relation types when language UUID changes
   */
  useEffect(() => {
    setLoading(true);
    queryLanguageRelationTypes(languageUuid).then((response) => {
      setRelations(response.data || []);
      setLoading(false);
    });
  }, [languageUuid]);

  /**
   * Show deletion modal when relation UUID to delete is set
   */
  useEffect(() => {
    if (toDeleteRelationUuid) {
      setDeletionModal(true);
    }
  }, [toDeleteRelationUuid]);

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
   * Handle relation type creation
   * @param {string} name - The name of the relation type to create
   */
  const handleRelationCreation = (name: string) => {
    setLoading(true);
    createRelationType(languageUuid, {
      languageId: languageUuid,
      name: name,
    }).then((response) => {
      queryLanguageRelationTypes(languageUuid).then((response) => {
        setRelations(response.data || []);
        setLoading(false);
      });
    });
  };

  /**
   * Handle relation type deletion confirmation
   */
  const handleRelationDeletion = () => {
    setLoading(true);
    deleteRelationType(languageUuid, toDeleteRelationUuid).then((response) => {
      queryLanguageRelationTypes(languageUuid).then((response) => {
        setRelations(response.data || []);
        setLoading(false);
      });
    });
    setToDeleteRelationUuid("");
    setDeletionModal(false);
  };

  return (
    <>
      <Button
        variant="primary"
        className={styles.accordionItemSpacing}
        onClick={() => setCreationModal(true)}
      >
        Add Relation <PlusCircle className="ms-2" />
      </Button>
      {loading && (
        <div className="w-100 text-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      )}
      {!loading && relations.length === 0 && (
        <div className="text-muted">No relations</div>
      )}
      {!loading && relations.length > 0 && (
        <>
          {relations.map((relation, index) => (
            <Accordion
              onSelect={handleAccordionEnter}
              className={styles.accordionItemSpacing}
              key={index}
            >
              <Accordion.Item eventKey={index.toString()}>
                <RelationAccordionBody
                  relation={relation}
                  setToDeleteRelationUuid={setToDeleteRelationUuid}
                />
              </Accordion.Item>
            </Accordion>
          ))}
        </>
      )}
      <CreationModal
        show={creationModal}
        objectName="Relation"
        onHide={() => {
          setCreationModal(false);
        }}
        onCreate={handleRelationCreation}
      />
      <ConfirmationModal
        show={deletionModal}
        onCancel={() => {setDeletionModal(false);setToDeleteRelationUuid(null)}}
        onConfirm={handleRelationDeletion}
        message="Are your sure you want to delete this relation?"
        confirmButtonVariant="danger"
      />
    </>
  );
}
