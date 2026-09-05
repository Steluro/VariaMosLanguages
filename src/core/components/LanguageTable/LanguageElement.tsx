import { FC } from "react";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { Card } from "react-bootstrap";
import styles from "./LanguageElement.module.css";
import { PersonFill, CalendarPlusFill, ClockHistory } from "react-bootstrap-icons";

/**
 * Props for the LanguageElement component
 * @interface LanguageElementProps
 * @property {Language} language - The language to display
 */
export interface LanguageElementProps {
  language: Language;
}

/**
 * Card component displaying language key information
 * Shows language type, name, UUID, owner, status, and timestamps
 * @param {LanguageElementProps} props - The component props
 * @returns {JSX.Element} The rendered language element
 */
export const LanguageElement: FC<LanguageElementProps> = ({ language }) => {
  return (
    <Card className={styles.languageCard}>
      <Card.Body>
        <div className={styles.container}>
          <div className={styles.column}>
            <div className={styles.typeNameContainer}>
              <span className={styles.type}>{language.type}</span>
              <span className={`${styles.name} ${styles.label}`}>{language.name}</span>
            </div>
            <div className={`${styles.uuid}`}>
              {language.uuid}
            </div>
            <div className={`${styles.owner}`}>
              <span className={styles.icon}><PersonFill/></span>
              <span>{language?.owner?.name || "Unknown"}</span>
            </div>
          </div>
          <div className={styles.column}>
            <div className={`${styles.status} ${styles[language.status]}`}>
              {language.status}
            </div>
            {language.createdAt && (
              <div className={`${styles.timestamp}`}>
                <span className={styles.icon}><CalendarPlusFill /></span>
                <span>Created:</span>
                <span className={`${styles.createdAt}`}>{new Date(language.createdAt).toLocaleString()}</span>
              </div>
            )}
            {language.updatedAt && (
              <div className={`${styles.timestamp}`}>
                <span className={styles.icon}><ClockHistory /></span>
                <span>Updated:</span>
                <span className={`${styles.updatedAt}`}>{new Date(language.updatedAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};