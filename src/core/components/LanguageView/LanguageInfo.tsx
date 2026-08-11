import { PencilFill, PersonFill, Share, ShareFill, Trash, TrashFill } from "react-bootstrap-icons";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import styles from "./LanguageInfo.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { queryCollaborators } from "../../../DataProvider/Services/collaborator.service";
import { useSession } from "@variamosple/variamos-components";
import { useState, useEffect } from "react";
import { deleteLanguage } from "../../../DataProvider/Services/languages.service";
import ConfirmationModal from "../ConfirmationModal";
import CollaboratorModal from "../CollaboratorModal";

interface LanguageInfoProps {
  language: Language;
}

export function LanguageInfo({ language }: LanguageInfoProps) {
  const navigate = useNavigate();
  const { user } = useSession();
  const [userAccessLevel, setUserAccessLevel] = useState<string | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const checkUserAccess = async () => {
    // Check if user is owner
    if (language.owner.id === user?.id) {
      setUserAccessLevel("owner");
      return;
    }
    // If not owner or LanguageDirector, fetch collaborators and check user's role
    try {
      const collaborators = await queryCollaborators(language.uuid);
      
      const userCollaborator = collaborators?.find((collaborator: any) => collaborator.user.id === user?.id);
      if (userCollaborator) {
        setUserAccessLevel(userCollaborator.role);
      }
      // Check if user is LanguageDirector
      if (user.roles?.find((role: string) => role.toLowerCase() === "language director")) {
        setUserIsAdmin(true);
      }
    } catch (error) {
      console.error("Error checking user access:", error);
      setUserAccessLevel(null);
    }
    console.log(userAccessLevel);
  };

  useEffect(() => {
    if (language?.uuid && user?.id) {
      checkUserAccess();
    }
  }, [language?.uuid, user?.id]);

  const handleDeleteLanguage = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteLanguage = async () => {
    await deleteLanguage(language.uuid);
    setShowDeleteModal(false);
    navigate("/");
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.name}>{language.name}</div>
        <div className={styles.type}>{language.type}</div>
        <div className={styles.uuid}>UUID : {language.uuid}</div>
        {language.publicVersionId && (
          <div className={styles.uuid}>Public Version : <span className={styles.clickable} onClick={()=>navigate(`/${language.publicVersionId}`)}>{language.publicVersionId}</span></div>
        )}
        <div className={`${styles.owner}`}>
          <span className={styles.icon}><PersonFill/></span>
          <span>{language?.owner?.name || "Unknown"}</span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.status} ${styles[language.status]}`}>{language.status}</div>
        {language.status.toLowerCase()==="draft" && (
        <div className={styles.buttonRow}>
          {(userAccessLevel === "owner" || userAccessLevel === "manager") && <Button className="btn-Variamos-green" onClick={() => setShowShareModal(true)}><ShareFill/></Button>}
          {(userAccessLevel === "owner" || userAccessLevel === "editor" || userAccessLevel === "manager") && <Button className="btn-Variamos-yellow" onClick={()=>navigate(`/${language.uuid}/edit`)}><PencilFill/></Button>}
          {(userAccessLevel === "owner" || userIsAdmin) && <Button className="btn-Variamos-red" onClick={handleDeleteLanguage}><TrashFill/></Button>}
        </div>)}
      </div>
    </div>
    <ConfirmationModal
      show={showDeleteModal}
      onCancel={() => setShowDeleteModal(false)}
      onConfirm={confirmDeleteLanguage}
      message={`Are you sure you want to delete the language "${language.name}"? This action cannot be undone.`}
      confirmLabel="Delete"
      confirmButtonVariant="danger"
      cancelLabel="Cancel"
    />
    <CollaboratorModal
      languageId={language.uuid}
      show={showShareModal}
      onClose={() => setShowShareModal(false)}
    />
    </>
  );
}
