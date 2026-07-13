import { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppConfig } from "../Infraestructure/AppConfig";

import { AuthWrapper } from "@variamosple/variamos-components";
import LanguagePage from "./pages/LanguagesPage";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: (
          <AuthWrapper redirectPath={AppConfig.LOGIN_URL}>
            <div>Welcome to the new language landing page!</div>
          </AuthWrapper>
        ),
      },
      {
        path: "old",
        element: (
          <AuthWrapper redirectPath={AppConfig.LOGIN_URL}>
            <LanguagePage />
          </AuthWrapper>
        ),
      },
      {
        path: "new",
        element: (
          <AuthWrapper redirectPath={AppConfig.LOGIN_URL}>
            <div>Welcome to the new language creation page page!</div>
          </AuthWrapper>
        ),
      },
      {
        path: ":languageId/edit",
        element: (
          <AuthWrapper redirectPath={AppConfig.LOGIN_URL}>
            <div>Welcome to the new language edit page!</div>
          </AuthWrapper>
        ),
      },
      {
        path: ":languageId",
        element: (
          <AuthWrapper redirectPath={AppConfig.LOGIN_URL}>
            <div>
              Welcome to the new language viewing page!
              <br />
              actual id : {":languageId"}
            </div>
          </AuthWrapper>
        ),
      },
    ],
  },
];