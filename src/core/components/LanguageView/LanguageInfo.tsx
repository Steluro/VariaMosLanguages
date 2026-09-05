import { PencilFill, PersonFill, Share, ShareFill, Trash, TrashFill } from "react-bootstrap-icons";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import styles from "./LanguageInfo.module.css";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { queryCollaborators } from "../../../DataProvider/Services/collaborator.service";
import { useSession } from "@variamosple/variamos-components";
import { useState, useEffect } from "react";
import { deleteLanguage, updateLanguage } from "../../../DataProvider/Services/languages.service";
import ConfirmationModal from "../ConfirmationModal";
import CollaboratorModal from "../CollaboratorModal";
import { set } from "immer/dist/internal";

/**
 * Props for the LanguageInfo component
 * @interface LanguageInfoProps
 * @property {Language} language - The language to display
 * @property {(status: "draft" | "pending" | "published") => void} setNewStatus - Callback to set new language status
 * @property {(withdrawLanguageDirector: boolean) => void} setWithdrawLanguageDirector - Callback to set withdraw language director flag
 */
interface LanguageInfoProps {
  language: Language;
  setNewStatus: (status : "draft" | "pending" | "published") => void;
  setWithdrawLanguageDirector: (withdrawLanguageDirector: boolean) => void;
}

/**
 * Component displaying language information with status management and actions
 * Shows language name, type, UUID, owner, status, and provides edit/share/delete actions
 * @param {LanguageInfoProps} props - The component props
 * @returns {JSX.Element} The rendered language info component
 */
export function LanguageInfo({ language, setNewStatus, setWithdrawLanguageDirector }: LanguageInfoProps) {
  const navigate = useNavigate();
  const { user } = useSession();
  const [userAccessLevel, setUserAccessLevel] = useState<string | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  /**
   * Check user access level for the language (owner, collaborator, or admin)
   */
  const checkUserAccess = async () => {
    // Check if user is owner
    if (language.owner.id === user?.id) {
      setUserAccessLevel("owner");
    }
    // If not owner or LanguageDirector, fetch collaborators and check user's role
    try {
      const collaborators = await queryCollaborators(language.uuid);
      
      const userCollaborator = collaborators?.find((collaborator: any) => collaborator.user.id === user?.id);
      if (userCollaborator) {
        setUserAccessLevel(userCollaborator.role);
      }
      // Check if user is LanguageDirector
      if (user.roles?.find((role: string) => role.toLowerCase() === "language director"|| role.toLowerCase() === "administrator")) {
        setUserIsAdmin(true);
      }
    } catch (error) {
      console.error("Error checking user access:", error);
      setUserAccessLevel(null);
    }
  };

  /**
   * Check user access when language or user changes
   */
  useEffect(() => {
    if (language?.uuid && user?.id) {
      checkUserAccess();
      console.log(language.status, userAccessLevel, userIsAdmin);
    }
  }, [language?.uuid, user?.id]);

  /**
   * Show delete confirmation modal
   */
  const handleDeleteLanguage = async () => {
    setShowDeleteModal(true);
  };

  /**
   * Confirm and execute language deletion
   */
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
        <div className={`${styles.owner}`}>
          <span className={styles.icon}><PersonFill/></span>
          <span>{language?.owner?.name || "Unknown"}</span>
        </div>
      </div>
      <div className={styles.column}>
        {((language.status.toLowerCase()==="draft" || language.status.toLowerCase()==="pending") && userAccessLevel === "owner") || (language.status.toLowerCase()==="pending" && userIsAdmin) ? (
          <Dropdown>
            <Dropdown.Toggle className={`${styles.status} ${styles[language.status]}`} variant="none">
              {language.status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {userIsAdmin && language.status.toLowerCase() === "pending" ? (
                <>
                  <Dropdown.Item className={styles.draft} onClick={() => {setNewStatus("draft"); setWithdrawLanguageDirector(true);}}>draft</Dropdown.Item>
                  <Dropdown.Item className={styles.published} onClick={() => {setNewStatus("published");}}>published</Dropdown.Item>
                </>
              ) : userAccessLevel === "owner" && (
                <>
                  <Dropdown.Item disabled={language.status.toLowerCase() === "draft"} className={language.status.toLowerCase() === "draft" ? styles.disabled : styles.draft} onClick={language.status.toLowerCase() !== "draft" ? () => {setNewStatus("draft");} : undefined}>draft</Dropdown.Item>
                  <Dropdown.Item disabled={language.status.toLowerCase() === "pending"} className={language.status.toLowerCase() === "pending" ? styles.disabled : styles.pending} onClick={language.status.toLowerCase() !== "pending" ? () => {setNewStatus("pending")}: undefined}>pending</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div className={`${styles.status} ${styles[language.status]}`}>{language.status}</div>
        )}
        {(language.status.toLowerCase()==="draft"||language.status.toLowerCase()==="pending") && (
        <div className={styles.buttonRow}>
          {(userAccessLevel === "owner" || userAccessLevel === "manager") && <Button className="btn-Variamos-green" onClick={() => setShowShareModal(true)}><ShareFill/></Button>}
          {(userAccessLevel === "owner" || userAccessLevel === "editor" || userAccessLevel === "manager" || userIsAdmin)&& language.status.toLowerCase()!=="pending" && <Button className="btn-Variamos-yellow" onClick={()=>navigate(`/${language.uuid}/edit`)}><PencilFill/></Button>}
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
