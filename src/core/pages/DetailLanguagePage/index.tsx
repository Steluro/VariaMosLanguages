import { useParams } from "react-router-dom";
import LanguageView from "../../components/LanguageView/LanguageView";
import LanguagePageLayout from "../../components/LanguagePageLayout";
import LanguageContextProvider from "../../context/LanguageContext/LanguageContextProvider";


export default function LanguageDetailPage() {
  const { languageId } = useParams<{ languageId: string }>();

  return (
    <LanguageContextProvider>
      <LanguagePageLayout>
        <div className="p-4">
          <LanguageView languageId={languageId} />
        </div>
      </LanguagePageLayout>
    </LanguageContextProvider>
  );
}
