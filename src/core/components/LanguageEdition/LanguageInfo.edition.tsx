import { PencilFill, PersonFill, Share, ShareFill, Trash, TrashFill } from "react-bootstrap-icons";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import styles from "./LanguageInfo.module.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { queryCollaborators } from "../../../DataProvider/Services/collaborator.service";
import { useSession } from "@variamosple/variamos-components";
import { useState, useEffect } from "react";
import { updateLanguage } from "../../../DataProvider/Services/languages.service";

/**
 * Props for the LanguageEditionInfo component
 * @interface LanguageInfoProps
 * @property {Language} language - The language object to display and edit
 */
interface LanguageInfoProps {
  language: Language;
}

/**
 * Component for displaying and editing basic language information
 * Shows language name, type, UUID, owner, and status
 * @param {LanguageInfoProps} props - The component props
 * @returns {JSX.Element} The rendered language info component
 */
export function LanguageEditionInfo({ language }: LanguageInfoProps) {
  const { user } = useSession();
  const [languageName, setLanguageName] = useState(language.name);



  /**
   * Handle language name update on blur event
   * @param {string} name - The new language name
   */
  const handleBlurLanguageName = (name: string) => {
    updateLanguage(language.uuid, { name });
  };



  return (
    <>
    <div className={styles.container}>
      <div className={styles.column}>
        <Form.Control
          type="text"
          value={languageName}
          onChange={(e) => setLanguageName(e.target.value)}
          onBlur={(e) => handleBlurLanguageName(e.target.value)}
          className={styles.name}
        />
        <div className={styles.type}>{language.type}</div>
        <div className={styles.uuid}>UUID : {language.uuid}</div>
        <div className={`${styles.owner}`}>
          <span className={styles.icon}><PersonFill/></span>
          <span>{language?.owner?.name || "Unknown"}</span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.status} ${styles[language.status]}`}>{language.status}</div>
      </div>
    </div>
    </>
  );
}
