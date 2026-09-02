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

interface RelationContainerProps {
  languageUuid: string;
}

export function RelationTypeContainer({
  languageUuid,
}: RelationContainerProps) {
  const [relations, setRelations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletionModal, setDeletionModal] = useState(false);
  const [creationModal, setCreationModal] = useState(false);
  const [toDeleteRelationUuid, setToDeleteRelationUuid] =
    useState<string>(null);

  useEffect(() => {
    setLoading(true);
    queryLanguageRelationTypes(languageUuid).then((response) => {
      setRelations(response.data || []);
      setLoading(false);
    });
  }, [languageUuid]);

  useEffect(() => {
    if (toDeleteRelationUuid) {
      setDeletionModal(true);
    }
  }, [toDeleteRelationUuid]);
  const handleAccordionEnter = () => {
    // Trigger Prism syntax highlighting when accordion opens
    if (typeof window !== "undefined" && (window as any).Prism) {
      setTimeout(() => {
        (window as any).Prism.highlightAll();
      }, 100);
    }
  };

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
