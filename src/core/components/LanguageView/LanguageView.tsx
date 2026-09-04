import { useState, useEffect } from "react";
import { LanguageInfo } from "./LanguageInfo";
import { queryLanguageById, updateLanguage } from "../../../DataProvider/Services/languages.service";
import { queryCollaborators } from "../../../DataProvider/Services/collaborator.service";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { Tab, Tabs } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { ElementTypeContainer } from "./Elements/ElementTypeContainer";
import { RelationTypeContainer } from "./Relations/RelationTypeContainer";
import { ReificationTypeContainer } from "./Reifications/ReificationTypeContainer";
import { UserReference } from "../../../Domain/ProductLineEngineering/Entities/UserReference";
import ConfirmationModal from "../ConfirmationModal";

interface LanguageViewProps {
  languageId: string;
}

export default function LanguageView({ languageId }: LanguageViewProps) {
  const [language, setLanguage] = useState<Language | null>(null);
  const [loading, setLoading] = useState(true);
  const [collaborators, setCollaborators] = useState<UserReference[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<"draft" | "pending" | "published">();
  const [message, setMessage] = useState<string>(null);
  const [withdrawLanguageDirector, setWithdrawLanguageDirector] = useState(false);

  const fetchCollaborators = async (languageUuid: string) => {
    try {
      const collaboratorsResponse = await queryCollaborators(languageUuid);
      setCollaborators(collaboratorsResponse);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      setCollaborators([]);
    }
  };

   const handleStatusChange = async (newStatus: "draft" | "pending" | "published") => {
    setShowStatusModal(false);
    setLoading(true);
    await updateLanguage(language.uuid, { status: newStatus });
    setNewStatus(null);
    loadLanguage(language.uuid);
  };

  const loadLanguage = async (languageId: string) => {
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
  }

  useEffect(() => {
    loadLanguage(languageId);
  }, [languageId]);

  useEffect(() => {
    if (newStatus) {
      switch (newStatus) {
        case "draft":
          withdrawLanguageDirector ? setMessage("Do you want to withdraw this language because it is not suitable to be published?") :
          setMessage("Are you sure you want to set the language as Draft?\nA Draft language is equivalent to a private language. No one without access will be able to use it in the Product Line.");
          break;
        case "pending":
          setMessage("Are you sure you want to set the language as Pending?\nA Pending language cannot be edited. The Language Director will need to approve it. Once approved, you will no longer be able to modify it. Published languages can be used and viewed by all VariaMos users.");
          break;
        case "published":
          setMessage("Are you sure you want to set the language as Published?\nA Published language can be used and viewed by all VariaMos users.\n Once Published it cannot be unpublished. You must be sure that all elements, relation and reifications are correct before publishing.");
          break;
      }
      setShowStatusModal(true);
    }
  }, [newStatus]);

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
      <LanguageInfo language={language} setNewStatus={setNewStatus} setWithdrawLanguageDirector={setWithdrawLanguageDirector}/>
      <Tabs
        defaultActiveKey="elements">
        <Tab
          eventKey="elements"
          title="Elements"
          className="pt-3"
          unmountOnExit
        >
          <ElementTypeContainer languageUuid={language.uuid} />
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
          <ReificationTypeContainer languageUuid={language.uuid} />
        </Tab>
      </Tabs>
      <ConfirmationModal
      show={showStatusModal}
      onCancel={() => {setShowStatusModal(false);setNewStatus(null)}}
      onConfirm={() => handleStatusChange(newStatus!)}
      message={message}
      confirmLabel="Change Status"
      confirmButtonVariant="primary"  
      cancelLabel="Cancel"
    />
    </div>
  );
}
