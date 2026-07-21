import axios from "axios";
import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig";
import { ResponseModel } from "@variamosple/variamos-components";
import { User } from "../../Domain/ProductLineEngineering/Entities/User";

export async function queryCollaborators(uuid: string) {
    return LANGUAGES_CLIENT.get(`/${uuid}/collaborators`)
    .then((response) => response.data)
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
}