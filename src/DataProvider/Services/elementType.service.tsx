import axios from "axios";

import { ResponseModel } from "@variamosple/variamos-components";
import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig";
import { ElementType } from "../../Domain/ProductLineEngineering/Entities/ElementType";

export const queryLanguageElementTypes = async (
  languageUuid: string
): Promise<ResponseModel<ElementType[]>> => {
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

export const createElementType = async (
  languageId: string,
  data: Partial<{
    languageId:string;
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
  }>
): Promise<ResponseModel<any>> => (
  console.log("SERVICE : ",languageId, data),
  LANGUAGES_CLIENT.post(`/${languageId}/element-types/`, data).then((response) => response).catch((error) => error)
)

export const updateElement = async (
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
  return LANGUAGES_CLIENT.put(`/${languageId}/element-types/${uuid}`, data)
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

export const getElement = async (languageId: string, uuid: string): Promise<ResponseModel<ElementType>> => {
  return LANGUAGES_CLIENT.get(`/${languageId}/element-types/${uuid}`)
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
          "Error when trying to get element, please try again later."
        );
      }
    }); 
}

export const deleteElementType = async (
  languageId: string,
  uuid: string
): Promise<ResponseModel<any>> => {
  return LANGUAGES_CLIENT.delete(`/${languageId}/element-types/${uuid}`)
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
          "Error when trying to delete element, please try again later."
        );
      }
    });
};