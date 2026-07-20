import {
  usePaginatedQuery,
  withPageVisit,
  useSession,
} from "@variamosple/variamos-components";
import { useEffect, useState } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { queryLanguages } from "../../../DataProvider/Services/languagesService";
import { PagedModel } from "../../../Domain/Core/Entity/PagedModel";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import { SearchForm } from "../SearchForm";
import { LanguagesList } from "./LanguagesList";
import * as alertify from "alertifyjs";
import { stat } from "fs";
import { FilterPannel } from "./FilterPannel";


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
  variant : "myLanguages" | "active" | "all";
  loadDataOnInit?: boolean;
}

function LanguagesContainerComponent ({
  variant,
  loadDataOnInit,
} : LanguagesContainerProps) : JSX.Element {

  const { user } = useSession();
  const [filter, setFilter] = useState(new LanguagesFilter());
  
  switch (variant) {
    case "myLanguages" :
      filter.ownerId = user?.id;
      filter.status = ["draft", "pending"];
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
    loadLanguages(filter);
  }, [filter]);

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
        <div className="w-100 text-center">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            className="mx-3"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!isLoading && (
          <Col md={9}>
            <LanguagesList
              variant = {variant}
              languages={languages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalPages={totalPages}
            />
          </Col>
      )}
      </Row>
    </div>
  );
};

export const LanguagesContainer = withPageVisit(
  LanguagesContainerComponent,
  "AllLanguageList"
);
