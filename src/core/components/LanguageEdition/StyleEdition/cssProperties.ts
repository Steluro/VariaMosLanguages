import cssPropertiesJson from "./cssProperties.json";

export const cssProperties = cssPropertiesJson;
export const cssPropertiesBodyName = Object.keys(cssPropertiesJson["body"]) as (keyof typeof cssPropertiesJson)[];
export const cssPropertiesTextName = Object.keys(cssPropertiesJson["text"]) as (keyof typeof cssPropertiesJson)[];