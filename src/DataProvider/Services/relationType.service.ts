import axios from "axios";

import { ResponseModel } from "@variamosple/variamos-components";
import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig";

export const queryLanguageRelationTypes = async (
  languageUuid: string
): Promise<ResponseModel<any>> => {
  return LANGUAGES_CLIENT.get('/' + languageUuid + '/relation-types/')
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


export const updateRelation = async (
  languageId: string,
  uuid: string,
  data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
  }>
): Promise<ResponseModel<any>> => {
  return LANGUAGES_CLIENT.put(`/${languageId}/relation-types/${uuid}`, data)
    .then((response) => { return response })
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
          "Error when trying to update element, please try again later."
        );
      }
    });
};


