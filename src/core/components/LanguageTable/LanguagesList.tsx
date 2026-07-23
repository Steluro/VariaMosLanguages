import { useSession } from "@variamosple/variamos-components";
import { useEffect, useState } from "react";
import { Paginator, PaginatorProps } from "@variamosple/variamos-components";
import { FC } from "react";
import { Alert, Button } from "react-bootstrap";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { LanguageElement } from "./LanguageElement";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";

export interface LanguagesProps extends PaginatorProps {
  variant ?: "myLanguages" | "shared" | "active" | "all"; 
  languages: Language[];
  setShowCreationModal: (show: boolean) => void;
}

export const LanguagesList: FC<LanguagesProps> = ({
  variant,
  languages,
  currentPage,
  onPageChange,
  totalPages,
  setShowCreationModal,
}) => {
  const { user } = useSession();
  const navigate = useNavigate();
  let [myLanguages, active, all] = [false, false, false];

  switch(variant){
    case "myLanguages":
      myLanguages = true;
      break;
    case "shared":
      myLanguages = true;
      break;
    case "active":
      active = true;
      break;
    case "all":
      all = true;
      break;}

  if (!languages?.length) {
    return <Alert variant="info">No results available</Alert>;
  }

  return (
    <div className="d-flex flex-column" style={{ marginLeft: "auto" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {variant === "myLanguages" && (
          <Button variant="primary" onClick={() => setShowCreationModal(true)}>
            <span>New Language</span>
            <PlusCircle className="ms-2"/>
          </Button>
        )}
        <div className={variant === "myLanguages" ? "" : "ms-auto"}>
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <div className="languages-list">
        {languages.map((language, index) => (
          <div 
            key={index}
            className="cursor-pointer" 
            onClick={() => navigate(`/${language.uuid}`)}
          >
            <LanguageElement language = {language}></LanguageElement>
          </div>
        ))}
      </div>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
