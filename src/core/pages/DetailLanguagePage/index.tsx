import { useParams } from "react-router-dom";
import LanguageDetail from "../../components/LanguageView";
import LanguagePageLayout from "../../components/LanguagePageLayout";
import LanguageContextProvider from "../../context/LanguageContext/LanguageContextProvider";


export default function LanguageDetailPage() {
  const { languageId } = useParams<{ languageId: string }>();

  return (
    <LanguageContextProvider>
      <LanguagePageLayout>
        <LanguageDetail languageId={languageId} />
      </LanguagePageLayout>
    </LanguageContextProvider>
  );
}
