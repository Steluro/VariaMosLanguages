import { PersonFill } from "react-bootstrap-icons";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import styles from "./LanguageInfo.module.css";

interface LanguageInfoProps {
  language: Language;
}

export function LanguageInfo({ language }: LanguageInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.name}>{language.name}</div>
        <div className={styles.type}>{language.type}</div>
        <div className={styles.uuid}>UUID : {language.uuid}</div>
        <div className={styles.uuid}>Public Version ID : {language.publicVersionId || "None" }</div>
        <div className={`${styles.owner}`}>
          <span className={styles.icon}><PersonFill/></span>
          <span>{language?.owner?.name || "Unknown"}</span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.status} ${styles[language.status]}`}>{language.status}</div>
      </div>
    </div>
  );
}
