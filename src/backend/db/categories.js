import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "javascript concepts",
  },
  {
    _id: uuid(),
    categoryName: "promise in javascript",
  },
  {
    _id: uuid(),
    categoryName: "react hooks",
  },
  {
    _id: uuid(),
    categoryName: "react router",
  },
  {
    _id: uuid(),
    categoryName: "css",
  },
  {
    _id: uuid(),
    categoryName: "html",
  },
];
