import { useSession } from "@variamosple/variamos-components";
import { useState } from "react";

interface LanguageDetailProps {
  languageId: string;
}

export default function LanguageDetail({ languageId }: LanguageDetailProps) {
  const { user } = useSession()
  const [showSpinner, setShowSpinner] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState(String());
  
  return null;
}
