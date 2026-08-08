import {
  usePaginatedQuery,
  withPageVisit,
  useSession,
} from "@variamosple/variamos-components";
import { useEffect, useState } from "react";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import { createLanguage, queryLanguages } from "../../../DataProvider/Services/languages.service";
import { PagedModel } from "../../../Domain/Core/Entity/PagedModel";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { SearchForm } from "../SearchForm";
import { LanguagesList } from "./LanguagesList";
import * as alertify from "alertifyjs";
import { stat } from "fs";
import { FilterPannel } from "./FilterPannel";
import CreationModal from "../LanguageManager/CreationModal";


export class LanguagesFilter extends PagedModel {
  constructor(
    public uuid?: string | string[],
    public name?: string | string[],
    public type?: string | string[],
    public status?: string | string[],
    public createdBefore?: Date | string,
    public createdAfter?: Date | string,
    public updatedBefore?: Date | string,
    public updatedAfter?: Date | string,
    public ownerId?: string | string[],
    public ownerName?: string | string[],
    public collaboratorId?: string | string[],
    public collaboratorName?: string | string[],
    public collaboratorRole?: string | string[],
    pageNumber?: number,
    pageSize?: number,
  ) {
    super(pageNumber, pageSize);
  }
}

export interface LanguagesContainerProps {
  variant : "myLanguages" | "shared" |"active" | "all";
  loadDataOnInit?: boolean;
}

function LanguagesContainerComponent ({
  variant,
  loadDataOnInit,
} : LanguagesContainerProps) : JSX.Element {

  const { user } = useSession();
  const [filter, setFilter] = useState(new LanguagesFilter());
  const [showCreationModal, setShowCreationModal] = useState(false);
  
  switch (variant) {
    case "myLanguages" :
      filter.ownerId = user?.id;
      filter.status = ["draft", "pending"];
      break;
    case "shared" :
      filter.status = ["draft", "pending"];
      filter.collaboratorId = user?.id;
      break;
    case "active" :
      filter.status = "published";
      break;
    case "all" :
      // No filter needed for "all" - shows all statuses
      break;
    default:
      break;
  }

  const {
    data: languages,
    loadData: loadLanguages,
    isLoading,
    currentPage,
    onPageChange,
    totalPages,
    filter: languagesFilter,
  } = usePaginatedQuery<LanguagesFilter, Language>({
    queryFunction: queryLanguages,
    initialFilter: filter,
  });
  
  useEffect(() => {
    if (loadDataOnInit) {
      loadLanguages(filter);
      console.log(languages);
    }
  }, [loadDataOnInit, loadLanguages, user?.id]);

  useEffect(() => {
    if (variant === "myLanguages" || variant === "shared") {
      // Validate filter status values
      if (filter.status) {
        const validStatuses = ["draft", "pending"];
        if (Array.isArray(filter.status)) {
          const invalidStatuses = filter.status.filter(s => !validStatuses.includes(s));
          if (invalidStatuses.length > 0) {
            console.error("Invalid filter status values:", invalidStatuses);
            return;
          }
        } else if (!validStatuses.includes(filter.status)) {
          console.error("Invalid filter status value:", filter.status);
          return;
        }
      }
    }
    loadLanguages(filter);
  }, [filter, variant]);

  const handleCreateLanguage = async (name: string, type: "scope" | "domain" | "application") => {
    console.log("Creating language:", name, type);
    const language = {
      name: name,
      type: type,
      status : "draft"
    };
    await createLanguage(language);
    setShowCreationModal(false);
    loadLanguages(filter);
  };

  return (
    <div>
      <Row>
      <Col md={3}>
        <FilterPannel
          languageFilter={filter}
          setLanguageFilter={setFilter}
          variant={variant}
        />
      </Col>
      {isLoading && (
        <Col md={9} className="w-100 text-center">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            className="mx-3"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      )}

      {!isLoading && (
          <Col md={9} style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
            <LanguagesList
              variant = {variant}
              languages={languages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              setShowCreationModal={setShowCreationModal}
              totalPages={totalPages}
            />
          </Col>
      )}
      </Row>
      <CreationModal
        show={showCreationModal}
        onHide={() => setShowCreationModal(false)}
        onCreate={handleCreateLanguage}
      />
    </div>
  );
};

export const LanguagesContainer = withPageVisit(
  LanguagesContainerComponent,
  "AllLanguageList"
);
