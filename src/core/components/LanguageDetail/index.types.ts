import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";

export interface LanguageDetailProps {
  language: Language;
  isCreatingLanguage: boolean;
  setComment?: React.Dispatch<React.SetStateAction<Comment>>;
  setEditLanguage: (edit) => void;
}
