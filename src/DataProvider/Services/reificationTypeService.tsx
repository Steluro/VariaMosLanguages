import { ResponseModel } from "@variamosple/variamos-components"
import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig"

export async function queryLanguageReificationTypes(languageId :string):
    Promise<ResponseModel<any>> {
      return LANGUAGES_CLIENT.get(`/${languageId}/reification-types`)
      .then((response) => response)
      .catch((error) => {
        console.error("Axios error:", error.message);
        return error;
      })
}