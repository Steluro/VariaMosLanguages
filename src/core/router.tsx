import { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppConfig } from "../Infraestructure/AppConfig";

import LanguagePage from "./pages/LanguagePage";
import { AuthWrapper } from "@variamosple/variamos-components";
import DetailLanguagePage from "./pages/DetailLanguagePage";
import EditionLanguagePage from "./pages/EditionLanguagePage";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: (
          <AuthWrapper redirectPath={AppConfig.LOGIN_URL}>
            <LanguagePage />
          </AuthWrapper>
        ),
      },
      {
        path: ":languageId/edit",
        element: (
          <AuthWrapper redirectPath={AppConfig.LOGIN_URL}>
            <EditionLanguagePage />
          </AuthWrapper>
        ),
      },
      {
        path: ":languageId",
        element: (
          <AuthWrapper redirectPath={AppConfig.LOGIN_URL}>
            <DetailLanguagePage />
          </AuthWrapper>
        ),
      },
    ],
  },
];