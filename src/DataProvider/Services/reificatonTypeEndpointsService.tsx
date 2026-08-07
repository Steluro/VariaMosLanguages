import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig";

export async function queryReificationTypeEndpoints(languageId: string, reificationTypeId: string) {
    const response = await LANGUAGES_CLIENT.get(`/${languageId}/reification-types/${reificationTypeId}/endpoints`);
    return response;
}