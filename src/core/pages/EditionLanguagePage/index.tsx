import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSession } from "@variamosple/variamos-components";
import LanguagePageLayout from "../../components/LanguagePageLayout";
import LanguageContextProvider from "../../context/LanguageContext/LanguageContextProvider";
import { queryCollaborators } from "../../../DataProvider/Services/collaboratorService";
import { queryLanguageById } from "../../../DataProvider/Services/languagesService";
import ForbiddenPage from "../ForbiddenPage";
import { Row, Spinner } from "react-bootstrap";
import { LanguageEditionInfo } from "../../components/LanguageEdition/LanguageInfo.edition";
import LanguageEdition from "../../components/LanguageEdition/Language.edition";


export default function EditionLanguagePage() {
  const { languageId } = useParams<{ languageId: string }>();
  const { user } = useSession();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>(null);

  useEffect(() => {
    const checkAccess = async () => {
      if (!languageId) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        // Get language details to check if user is owner
        const languageResponse = await queryLanguageById(languageId);
        const language = languageResponse.data;

        //If language is Public, can't be modified
        if (language?.status === "published") {
          setHasAccess(false);
          setLoading(false);
          setMessage("Published Language can't be modified");
          return;
        }
        
        // If user is owner, allow access
        if (language?.ownerId === user?.id) {
          setHasAccess(true);
          setLoading(false);
          return;
        }

        // Check collaborators list for editor or manager role
        const collaboratorsResponse = await queryCollaborators(languageId);
        const collaborators = collaboratorsResponse;

        const hasEditAccess = collaborators?.some((collaborator: any) => 
          collaborator.user?.id === user?.id && 
          (collaborator.role === "editor" || collaborator.role === "manager")
        );
        setHasAccess(hasEditAccess || false);
        setMessage("You don't have editing access to that Language");
      } catch (error) {
        console.error("Error checking access:", error);
        setHasAccess(false);
        setMessage("Error checking access");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [languageId, user?.id]);

  if (loading) {
    return (
      <div className="w-100 text-center" style={{ marginTop: "2rem" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <LanguagePageLayout>
        <div className="p-4">
          <ForbiddenPage message={message} />
        </div>
      </LanguagePageLayout>
    );
  }

  return (
    <LanguageContextProvider>
      <LanguagePageLayout>
        <div className="p-4" style={{ marginLeft: '5rem', marginRight: '5rem' }}>
          <LanguageEdition languageId={languageId} />
        </div>
      </LanguagePageLayout>
    </LanguageContextProvider>
  );
}