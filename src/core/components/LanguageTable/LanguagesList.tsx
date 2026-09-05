import { useSession } from "@variamosple/variamos-components";
import { useEffect, useState } from "react";
import { Paginator, PaginatorProps } from "@variamosple/variamos-components";
import { FC } from "react";
import { Alert, Button } from "react-bootstrap";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { LanguageElement } from "./LanguageElement";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";

/**
 * Props for the LanguagesList component
 * @interface LanguagesProps
 * @property {"myLanguages" | "shared" | "active" | "all"} variant - The variant of language list
 * @property {Language[]} languages - The languages to display
 * @property {(show: boolean) => void} setShowCreationModal - Callback to show/hide creation modal
 * @property {number} currentPage - The current page number
 * @property {(page: number) => void} onPageChange - Callback when page changes
 * @property {number} totalPages - The total number of pages
 */
export interface LanguagesProps extends PaginatorProps {
  variant ?: "myLanguages" | "shared" | "active" | "all"; 
  languages: Language[];
  setShowCreationModal: (show: boolean) => void;
}

/**
 * List component for displaying languages with pagination
 * Shows language cards and provides navigation to language details
 * @param {LanguagesProps} props - The component props
 * @returns {JSX.Element} The rendered languages list
 */
export const LanguagesList: FC<LanguagesProps> = ({
  variant,
  languages,
  currentPage,
  onPageChange,
  totalPages,
  setShowCreationModal,
}) => {
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
    return (<div><Button variant="primary" onClick={() => setShowCreationModal(true)}>
            <span>New Language</span>
            <PlusCircle className="ms-2"/>
          </Button><Alert variant="info">No results available</Alert></div>);
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
