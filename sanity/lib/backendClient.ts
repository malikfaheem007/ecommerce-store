import {createClient} from "next-sanity";
import {dataset, projectId, apiVersion} from "../env";
export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, //Set to false if statically generating pages, using ISR or
  // revalidation
  token: process.env.SANITY_API_TOKEN,
});
