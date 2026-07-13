import { useSession } from "@variamosple/variamos-components";
import { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { LanguagesContainer } from "../LanguageTable/LanguagesContainer";
import CreateLanguageButton from "./CreateLanguageButton/CreateLanguageButton";
import LanguageManagerLayout from "./LanguageManagerLayout/LanguageManagerLayout";
import { LanguageManagerProps } from "./index.types";
import {Button} from "react-bootstrap";
import { set } from "immer/dist/internal";

export default function LanguageManager({
  setLanguage,
  setCreatingLanguage,
  setEditLanguage,
}: LanguageManagerProps) {
  const { user } = useSession();
  const [isGuestUser, setIsGuestUser] = useState(true);
  const [isLanguageDirectorUser, setIsLanguageDirectorUser] = useState(false);
  const [loadUserLanguages, setLoadUserLanguages] = useState(true);
  const [loadPublicLanguages, setLoadPublicLanguages] = useState(false);
  const [loadPendingLanguages, setLoadPendingLanguages] = useState(false);
  const [loadDeletedLanguages, setLoadDeletedLanguages] = useState(false);

  useEffect(() => {
    const isGuest = user.roles.find((role) => role.toLowerCase() === "guest");
    const isLanguageDirector = user.roles.find((role) => role.toLowerCase() === "language director");
    setIsGuestUser(!!isGuest);
    setLoadPublicLanguages(isGuestUser);
    setIsLanguageDirectorUser(!!isLanguageDirector);
    setLoadPublicLanguages(!!isGuest);
  }, [user]);

  const handleCreateClick = () => {
    setCreatingLanguage(true);
    setEditLanguage(true);
  };

  const handleClick = (language) => {
    setLanguage(language);
    setCreatingLanguage(false);
    setEditLanguage(true);
  };

  if (isGuestUser) {
    return (
      <LanguageManagerLayout>
        <Col as={Row}>
          <Col sm={6}>
            <CreateLanguageButton handleCreateClick={handleCreateClick} />
          </Col>
        </Col>

        <LanguagesContainer
          variant = "active"
          loadDataOnInit={loadPublicLanguages}
          onLanguageClick={handleClick}
        />
      </LanguageManagerLayout>
    );
  }

  return (
    <LanguageManagerLayout>

      <div className='d-flex gap-1'>
        <CreateLanguageButton handleCreateClick={handleCreateClick} />
      </div>

      <Tabs
        defaultActiveKey="userLanguages"
        id="uncontrolled-tab"
        onSelect={
          (eventKey)=> {
            switch (eventKey) {
              case ("userLanguages"):
                setLoadUserLanguages(true);
                break;
              case "publicLanguages":
                setLoadPublicLanguages(true);
                break;
              case "pendingLanguages":
                setLoadPendingLanguages(true);
                break;
              case "deltedLanguages":
                setLoadDeletedLanguages(true);
                break;
              default:
                break;
            }
              }}
      >
        <Tab
          eventKey="userLanguages"
          title="My Languages"
          className="pt-3"
          unmountOnExit
        >
          <LanguagesContainer
            variant = "myLanguages"
            loadDataOnInit={loadUserLanguages}
            onLanguageClick={handleClick}
          />
        </Tab>

        <Tab
          eventKey="publicLanguages"
          title="Public Languages"
          className="pt-3"
          unmountOnExit
        >
          <LanguagesContainer
            variant = "active"
            loadDataOnInit={loadPublicLanguages}
            onLanguageClick={handleClick}
          />
        </Tab>
        { isLanguageDirectorUser && (<Tab 
          eventKey="pendingLanguages"
          title="Pending Languages"
          className="pt-3"
          unmountOnExit
          >
            <LanguagesContainer
            variant = "pending"
            loadDataOnInit={loadPendingLanguages}
            onLanguageClick={handleClick}
            />
        </Tab>)}
        { isLanguageDirectorUser && (<Tab 
          eventKey="deltedLanguages"
          title="Deleted Languages"
          className="pt-3"
          unmountOnExit
          >
            <LanguagesContainer
            variant = "deleted"
            loadDataOnInit={loadDeletedLanguages}
            onLanguageClick={handleClick}
            />
        </Tab>)}
      </Tabs>
    </LanguageManagerLayout>
  );
}
