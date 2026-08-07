import axios from "axios";

import { ResponseModel } from "@variamosple/variamos-components";
import { Language } from "../../Domain/ProductLineEngineering/Entities/Language";
import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig";
import { LanguagesFilter } from "../../core/components/LanguageTable/LanguagesContainer";

export const queryLanguages = (
  filter: LanguagesFilter
): Promise<ResponseModel<Language[]>> => {
  return LANGUAGES_CLIENT.get('/', {
    params: { ...filter },
  })
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

export const queryLanguageById = (
 languageUuid : string
): Promise<ResponseModel<Language>> => {
  return LANGUAGES_CLIENT.get('/' + languageUuid)
    .then((response) => {console.log(response?? []); return response})
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

export const deleteLanguage = (
  languageUuid: string
): Promise<ResponseModel<void>> => {
  return LANGUAGES_CLIENT.delete('/' + languageUuid)
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

export const createLanguage = (language: any): Promise<ResponseModel<Language>> => {
  return LANGUAGES_CLIENT.post('/', language)
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

export const asyncUpdateLanguageName = async (languageUuid: string, name: string) => {
    return LANGUAGES_CLIENT.put('/' + languageUuid, { name })
}