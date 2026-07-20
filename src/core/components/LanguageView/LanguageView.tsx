import { useState, useEffect } from "react";
import { LanguageInfo } from "./LanguageInfo";
import { queryLanguageById } from "../../../DataProvider/Services/languagesService";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { Tab, Tabs } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

interface LanguageViewProps {
  languageId: string;
}

export default function LanguageView({ languageId }: LanguageViewProps) {
  const [language, setLanguage] = useState<Language | null>(null);
  const [loading, setLoading] = useState(true);

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
