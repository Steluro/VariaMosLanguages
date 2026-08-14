import { ResponseModel } from "@variamosple/variamos-components"
import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig"
import  axios from "axios"
import { ReificationType } from "../../Domain/ProductLineEngineering/Entities/ReificationType";

export async function queryLanguageReificationTypes(languageId :string):
    Promise<ResponseModel<ReificationType[]>> {
      return LANGUAGES_CLIENT.get(`/${languageId}/reification-types`)
      .then((response) => response)
      .catch((error) => {
        console.error("Axios error:", error.message);
        return error;
      })
}

export const updateReification = async (
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
  return LANGUAGES_CLIENT.put(`/${languageId}/reification-types/${uuid}`, data)
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

export const createReificationType = async (
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
  LANGUAGES_CLIENT.post(`/${languageId}/reification-types/`, data).then((response) => response).catch((error) => error)
)

export const updateReificationType = async (
  languageId: string,
  uuid: string,
  data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
  }>
): Promise<ResponseModel<any>> => (
  LANGUAGES_CLIENT.put(`/${languageId}/reification-types/${uuid}`, data).then((response) => response).catch((error) => error)
)

export const deleteReificationType = async (
  languageId: string,
  uuid: string
): Promise<ResponseModel<any>> => {
  return LANGUAGES_CLIENT.delete(`/${languageId}/reification-types/${uuid}`)
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
          "Error when trying to delete reification, please try again later."
        );
      }
    });
};