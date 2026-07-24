import axios from "axios";

import { ResponseModel } from "@variamosple/variamos-components";
import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig";

export const queryLanguageElementTypes = async (
  languageUuid: string
): Promise<ResponseModel<any>> => {
  return LANGUAGES_CLIENT.get('/' + languageUuid + '/element-types/')
    .then((response) => {return response})
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);

        const response = error.response?.data;

        if (!!response) {
          return response;
        }

        return new ResponseModel("BACK-ERROR").withError(
          Number.parseInt(error.code || "500"),
          "Error when comunicating with the back-end."
        );
      } else {
        console.error("Unexpected error:", error);

        return new ResponseModel("APP-ERROR").withError(
          500,
          "Error when trying to get session info, please try again later."
        );
      }
    });
};
