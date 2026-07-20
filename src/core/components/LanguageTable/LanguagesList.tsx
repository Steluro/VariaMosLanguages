import { useSession } from "@variamosple/variamos-components";
import { useEffect, useState } from "react";
import { Paginator, PaginatorProps } from "@variamosple/variamos-components";
import { FC } from "react";
import { Alert } from "react-bootstrap";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { LanguageElement } from "./LanguageElement";
import { useNavigate } from "react-router-dom";

export interface LanguagesProps extends PaginatorProps {
  variant ?: "myLanguages" | "active" | "all"; 
  languages: Language[];

}

export const LanguagesList: FC<LanguagesProps> = ({
  variant,
  languages,
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const { user } = useSession();
  const navigate = useNavigate();
  let [myLanguages, active, all] = [false, false, false];

  switch(variant){
    case "myLanguages":
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
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
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
