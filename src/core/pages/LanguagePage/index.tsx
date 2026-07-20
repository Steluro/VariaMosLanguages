import LanguageManager from "../../components/LanguageManager";
import LanguagePageLayout from "../../components/LanguagePageLayout";
import LanguageContextProvider from "../../context/LanguageContext/LanguageContextProvider";


export default function LanguagePage() {

  return (
    <LanguageContextProvider>
      <LanguagePageLayout>
        <div className="p-4">
          <LanguageManager/>
        </div>
      </LanguagePageLayout>
    </LanguageContextProvider>
  );
}
