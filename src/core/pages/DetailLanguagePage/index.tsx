import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSession } from "@variamosple/variamos-components";
import LanguageView from "../../components/LanguageView/LanguageView";
import LanguagePageLayout from "../../components/LanguagePageLayout";
import LanguageContextProvider from "../../context/LanguageContext/LanguageContextProvider";
import { queryCollaborators } from "../../../DataProvider/Services/collaborator.service";
import { queryLanguageById } from "../../../DataProvider/Services/languages.service";
import ForbiddenPage from "../ForbiddenPage";
import { Spinner } from "react-bootstrap";


export default function LanguageDetailPage() {
  const { languageId } = useParams<{ languageId: string }>();
  const { user } = useSession();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!languageId) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        // Get language details to check if it's public
        const languageResponse = await queryLanguageById(languageId);
        const language = languageResponse.data;

        // If language is public (has publicVersionId), allow access
        if (language?.status.toLowerCase() === "published") {
          setHasAccess(true);
          setLoading(false);
          return;
        }

        // If not public, check if user is owner or collaborator
        if (language?.ownerId === user?.id) {
          setHasAccess(true);
          setLoading(false);
          return;
        }

        // Check collaborators list
        const collaboratorsResponse = await queryCollaborators(languageId);
        const collaborators = collaboratorsResponse;

        const isCollaborator = collaborators?.some((collaborator: any) => collaborator.user?.id === user?.id);
        setHasAccess(isCollaborator || false);
      } catch (error) {
        console.error("Error checking access:", error);
        setHasAccess(false);
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
          <ForbiddenPage />
        </div>
      </LanguagePageLayout>
    );
  }

  return (
    <LanguageContextProvider>
      <LanguagePageLayout>
            <div className="p-4" style={{ marginLeft: '5rem', marginRight: '5rem' }}>
               <LanguageView languageId={languageId} />
             </div>
      </LanguagePageLayout>
    </LanguageContextProvider>
  );
}
