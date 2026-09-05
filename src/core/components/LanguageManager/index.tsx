import { useSession } from "@variamosple/variamos-components";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { LanguagesContainer } from "../LanguageTable/LanguagesContainer";
import LanguageManagerLayout from "./LanguageManagerLayout/LanguageManagerLayout";

/**
 * Main Language Manager component
 * Manages language viewing based on user roles (guest, language director)
 * Displays different tabs for user languages, shared languages, public languages, and all languages (if language director)
 * @returns {JSX.Element} The rendered language manager
 */
export default function LanguageManager() {
  const { user } = useSession();
  const [isGuestUser, setIsGuestUser] = useState(true);
  const [isLanguageDirectorUser, setIsLanguageDirectorUser] = useState(false);
  const [loadUserLanguages, setLoadUserLanguages] = useState(true);
  const [loadPublicLanguages, setLoadPublicLanguages] = useState(false);
  const [loadAllLanguages, setLoadAllLanguages] = useState(false);
  const [loadSharedLanguages, setLoadSharedLanguages] = useState(false);

  /**
   * Check user roles and set appropriate language loading states
   */
  useEffect(() => {
    const isGuest = user.roles.find((role) => role.toLowerCase() === "guest");
    const isLanguageDirector = user.roles.find((role) => role.toLowerCase() === "language director");
    setIsGuestUser(!!isGuest);
    setLoadPublicLanguages(isGuestUser);
    setIsLanguageDirectorUser(!!isLanguageDirector);
    setLoadPublicLanguages(!!isGuest);
  }, [user]);

  if (isGuestUser) {
    return (
      <LanguageManagerLayout>
        <LanguagesContainer
          variant = "active"
          loadDataOnInit={loadPublicLanguages}
        />
      </LanguageManagerLayout>
    );
  }

  return (
    <LanguageManagerLayout>
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
              case "allLanguages":
                setLoadAllLanguages(true);
                break;
              case "sharedWwithMe":
                setLoadSharedLanguages(true);
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
          />
        </Tab>
        <Tab
          eventKey="sharedWwithMe"
          title="Shared With Me"
          className="pt-3"
          unmountOnExit
        >
          <LanguagesContainer
            variant = "shared"
            loadDataOnInit={loadSharedLanguages}
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
          />
        </Tab>
        { isLanguageDirectorUser && (<Tab
          eventKey="allLanguages"
          title="All Languages"
          className="pt-3"
          unmountOnExit
          >
            <LanguagesContainer
            variant = "all"
            loadDataOnInit={loadAllLanguages}
            />
        </Tab>)}
      </Tabs>
    </LanguageManagerLayout>
  );
}
