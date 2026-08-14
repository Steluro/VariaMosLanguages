import { PencilFill, PersonFill, Share, ShareFill, Trash, TrashFill } from "react-bootstrap-icons";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import styles from "./LanguageInfo.module.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { queryCollaborators } from "../../../DataProvider/Services/collaborator.service";
import { useSession } from "@variamosple/variamos-components";
import { useState, useEffect } from "react";
import { updateLanguage } from "../../../DataProvider/Services/languages.service";

interface LanguageInfoProps {
  language: Language;
}

export function LanguageEditionInfo({ language }: LanguageInfoProps) {
  const navigate = useNavigate();
  const { user } = useSession();
  const [userAccessLevel, setUserAccessLevel] = useState<string | null>(null);
  const [languageName, setLanguageName] = useState(language.name);

  const checkUserAccess = async () => {
    // Check if user is owner
    if (language.owner.id === user?.id) {

      setUserAccessLevel("owner");
      return;
    }
    // Check if user is LanguageDirector
    if (user.roles?.find((role: string) => role.toLowerCase() === "language director")) {
      setUserAccessLevel("admin");
      return;
    }
    // If not owner or LanguageDirector, fetch collaborators and check user's role
    try {
      const collaborators = await queryCollaborators(language.uuid);
      
      const userCollaborator = collaborators?.find((collaborator: any) => collaborator.id === user?.id);
      if (userCollaborator) {
        setUserAccessLevel(userCollaborator.role);
      } else {
        setUserAccessLevel(null);
      }
    } catch (error) {
      console.error("Error checking user access:", error);
      setUserAccessLevel(null);
    }
  };

  const handleBlurLanguageName = (name: string) => {
    updateLanguage(language.uuid, { name });
  };

  useEffect(() => {
    if (language?.uuid && user?.id) {
      checkUserAccess();
    }
  }, [language?.uuid, user?.id]);

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
