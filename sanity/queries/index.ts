import {sanityFetch} from "../lib/live";

const getCategories = async (quantity?: number) => {
  try {
    const query =
      quantity ?
        `*[_type == "category"] | order(title asc) [0...$quantity]{
    ...,"productCount": count(*[_type == "product" && references(^._id)])}`
      : `*[_type == "category"] | order(title asc){
    ...,"productCount": count(*[_type == "product" && references(^._id)])}`;
    const {data} = await sanityFetch({
      query,
      params: quantity ? {quantity} : {},
    });
    return data;
  } catch (error) {
    console.log("Error fetching categories:", error);
    return [];
  }
};
export {getCategories};
