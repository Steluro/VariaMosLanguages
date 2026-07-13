import { useSession } from "@variamosple/variamos-components";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Paginator, PaginatorProps } from "@variamosple/variamos-components";
import { FC } from "react";
import { Alert, Table } from "react-bootstrap";
import { Language } from "../../../Domain/ProductLineEngineering/Entities/Language";
import {
  Trash,
  Share,
  CheckLg,
  XLg,
  ArrowClockwise,
  FileEarmarkXFill,
} from "react-bootstrap-icons";
import SharedUserModal from "../SharedUserModal";
import { shareLanguageWithUser } from "../../../DataProvider/Services/sharedUserService";
import { set } from "immer/dist/internal";

export interface LanguagesProps extends PaginatorProps {
  variant ?: "myLanguages" | "active" | "pending" | "deleted"; 
  languages: Language[];
  onLanguageClick: (language: Language) => void;
  onLanguageDelete: (language: Language) => void;
  onLanguageUpdateStateAccept: (
    language: Language,
    stateAccept: string,
  ) => void;
}

export const LanguagesList: FC<LanguagesProps> = ({
  variant,
  onLanguageUpdateStateAccept,
  languages,
  onLanguageClick,
  onLanguageDelete,
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const { user } = useSession();
  const [isLanguageDirector, setIsLanguageDirector] = useState(false);
  const [sharedUserModal, setSharedUserModal] = useState(false);
  const [languageId, setLanguageId] = useState(null);
  let [myLanguages, active, pending, deleted] = [false, false, false, false];

  switch(variant){
    case "myLanguages":
      myLanguages = true;
      break;
    case "active":
      active = true;
      break;
    case "pending":
      pending = true;
      break;
    case "deleted":
      deleted = true;
      break;}


  useEffect(() => {
    setIsLanguageDirector(
      !!user.roles.find((role) => role.toLowerCase() === "language director"),
    );
  }, [user]);

  if (!languages?.length) {
    return <Alert variant="info">No results available</Alert>;
  }

  const handleShareUser = async (userId: string, languageId: number) => {
    await shareLanguageWithUser(languageId, userId);
  };

  return (
    <div className="d-flex flex-column">
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Table bordered hover responsive="sm">
        <thead>
          <tr>
            {(isLanguageDirector && (pending || deleted)) && <th>Id</th>}
            <th>Name</th>
            <th>Type</th>
            {(pending || deleted) && <th>Status</th>}
            <th>Owner</th>
            {(myLanguages || pending || deleted || (active && isLanguageDirector)) && <th className="center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {languages.map((language, index) => (
            <tr key={index} className="cursor-pointer">
              {(isLanguageDirector && (pending || deleted)) && (
                <td onClick={() => onLanguageClick(language)}>{language.id}</td>
              )}
              <td onClick={() => onLanguageClick(language)}>{language.name}</td>
              <td onClick={() => onLanguageClick(language)}>{language.type}</td>
              {(pending || deleted) && (
                <td onClick={() => onLanguageClick(language)}>
                  {language.stateAccept}
                </td>
              )}
              <td onClick={() => onLanguageClick(language)}>
                {language?.["ownerName"]}
              </td>
              {(myLanguages || pending || deleted ||(active && isLanguageDirector)) && (
                <td className="text-center">
                  <div className="d-flex gap-1 center">
                    {pending && (
                        <Button
                          className="btn-Variamos-green"
                          title="Approve Language"
                          onClick={() =>
                            onLanguageUpdateStateAccept(language, "ACTIVE")
                          }
                        >
                          <CheckLg />
                        </Button>
                      )}
                    {(active && isLanguageDirector) && (
                        <Button
                          className="btn-Variamos-yellow"
                          title="Disapprove Language"
                          onClick={() =>
                            onLanguageUpdateStateAccept(language, "PENDING")
                          }
                        >
                          <XLg />
                        </Button>
                      )}
                    {myLanguages &&
                      language?.accessLevel?.toLowerCase() == "owner" && (
                        <Button
                          className="btn-Variamos-green"
                          title="Share Language"
                          onClick={() => {
                            setLanguageId(language.id);
                            setSharedUserModal(true);
                          }}
                        >
                          <Share />
                        </Button>
                      )}
                    { ((myLanguages &&
                        language?.accessLevel?.toLowerCase() == "owner") ||
                        pending || (active && isLanguageDirector)) && (
                        <Button
                          variant="danger"
                          onClick={() => onLanguageDelete(language)}
                          title="Delete language"
                        >
                          <Trash />
                        </Button>
                      )}
                    { deleted && (
                        <Button
                          variant="secondary"
                          onClick={() =>
                            onLanguageUpdateStateAccept(language, "PENDING")
                          }
                        >
                          <ArrowClockwise />
                        </Button>
                      )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <SharedUserModal
        show={sharedUserModal}
        languageId={languageId}
        onClose={() => {
          setSharedUserModal(false);
          setLanguageId(null);
        }}
        onShareUser={handleShareUser}
      />
    </div>
  );
};
