import { LANGUAGES_CLIENT } from "../../Infraestructure/AxiosConfig";

export async function queryReificationTypeEndpoints(languageId: string, reificationTypeId: string) {
    const response = await LANGUAGES_CLIENT.get(`/${languageId}/reification-types/${reificationTypeId}/endpoints`);
    return response;
}

export async function createReificationTypeEndpoint(
  languageId: string,
  reificationTypeId: string,
  data: Partial<{
      reificationTypeId : string
      name : string
      arity : number
      style : Record<string, unknown>
  }>
) {
  const response = await LANGUAGES_CLIENT.post(
    `/${languageId}/reification-types/${reificationTypeId}/endpoints`,
    data
  );
  return response;
}

export async function updateReificationTypeEndpoint(
  languageId:string,
  reificationTypeId: string,
  uuid: string,
  data: Partial<{
      name : string
      arity : number
      style : Record<string, unknown>
      elementTypes : Partial<Element>[]
  }>
) {
  const response = await LANGUAGES_CLIENT.put(
    `/${languageId}/reification-types/${reificationTypeId}/endpoints/${uuid}`,
    data
  );
  return response;
}

export async function deleteReificationTypeEndpoint( 
  languageId:string,
  reificationTypeId: string,
  uuid: string
) {
  const response = await LANGUAGES_CLIENT.delete(
    `/${languageId}/reification-types/${reificationTypeId}/endpoints/${uuid}`
  );
  return response;
}