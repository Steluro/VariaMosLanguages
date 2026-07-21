import { useState, useEffect } from "react";
import { LanguageInfo } from "./LanguageInfo";
import { queryLanguageById } from "../../../DataProvider/Services/languagesService";
import { queryCollaborators } from "../../../DataProvider/Services/collaboratorService";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { Tab, Tabs } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

interface LanguageViewProps {
  languageId: string;
}

export default function LanguageView({ languageId }: LanguageViewProps) {
  const [language, setLanguage] = useState<Language | null>(null);
  const [loading, setLoading] = useState(true);
  const [collaborators, setCollaborators] = useState<any[]>([]);

  const fetchCollaborators = async (languageUuid: string) => {
    try {
      const collaboratorsResponse = await queryCollaborators(languageUuid);
      setCollaborators(collaboratorsResponse);
      console.log("Collaborators:", collaboratorsResponse);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      setCollaborators([]);
    }
  };

  useEffect(() => {
    queryLanguageById(languageId)
      .then((response) => {
        if (response.data) {
          setLanguage(response.data);
          fetchCollaborators(response.data.uuid);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching language:", error);
        setLoading(false);
      });
  }, [languageId]);

  if (loading) {
    return  (<div className="w-100 text-center">
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
      <LanguageInfo language={language} />
      <Tabs
        defaultActiveKey="elements">
        <Tab
          eventKey="elements"
          title="Elements"
          className="pt-3"
          unmountOnExit
        >
          <pre>{JSON.stringify(language, null, 2)}</pre>
          <pre>{JSON.stringify(collaborators, null, 2)}</pre>
        </Tab>
        <Tab
          eventKey="relationships"
          title="Relationships"
          className="pt-3"
          unmountOnExit
        >

        </Tab>
      </Tabs>
    </div>
  );
}
