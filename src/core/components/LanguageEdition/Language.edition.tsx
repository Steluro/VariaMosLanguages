import { useState, useEffect } from "react";
import { LanguageEditionInfo } from "./LanguageInfo.edition";
import { queryLanguageById } from "../../../DataProvider/Services/languages.service";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { Tab, Tabs } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { ElementEditionTypeContainer } from "./ElementsEdition/ElementTypeContainer.edition";
import { RelationTypeContainer } from "./RelationsEdition/RelationTypeContainer.edition";
import { ReificationTypeContainerEdition } from "./ReificationsEdition/ReificationTypeContainer.edition";

/**
 * Props for the LanguageEdition component
 * @interface LanguageViewProps
 * @property {string} languageId - The ID of the language to display and edit
 */
interface LanguageViewProps {
  languageId: string;
}

/**
 * Main component for editing a language with tabs for Elements, Relationships, and Reifications
 * @param {LanguageViewProps} props - The component props
 * @returns {JSX.Element} The rendered language edition component
 */
export default function LanguageEdition({ languageId }: LanguageViewProps) {
  const [language, setLanguage] = useState<Language | null>(null);
  const [loading, setLoading] = useState(true);



  /**
   * Fetch language data on component mount or languageId change
   */
  useEffect(() => {
    queryLanguageById(languageId)
      .then((response) => {
        if (response.data) {
          setLanguage(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching language:", error);
        setLoading(false);
      });
  }, [languageId]);

  if (loading) {
    return (<div className="w-100 text-center">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        className="mx-3"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>);
  }

  if (!language) {
    return (<div className="alert alert-info" role="alert">Language not found</div>);
  }

  return (
    <div>
      <LanguageEditionInfo language={language} />
      <Tabs
        defaultActiveKey="elements">
        <Tab
          eventKey="elements"
          title="Elements"
          className="pt-3"
          unmountOnExit
        >
          <ElementEditionTypeContainer languageUuid={language.uuid} />
        </Tab>
        <Tab
          eventKey="relationships"
          title="Relationships"
          className="pt-3"
          unmountOnExit
        >
          <RelationTypeContainer languageUuid={language.uuid} />
        </Tab>
        <Tab
          eventKey="reifications"
          title="Reifications"
          className="pt-3"
          unmountOnExit
        >
          <ReificationTypeContainerEdition languageUuid={language.uuid} />
        </Tab>
      </Tabs>
    </div>
  );
}
