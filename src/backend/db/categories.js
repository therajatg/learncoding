import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "JavaScript Concepts",
  },
  {
    _id: uuid(),
    categoryName: "Promise in JavaScript",
  },
  {
    _id: uuid(),
    categoryName: "React Hooks",
  },
  {
    _id: uuid(),
    categoryName: "React Router",
  },
  {
    _id: uuid(),
    categoryName: "CSS",
  },
  {
    _id: uuid(),
    categoryName: "HTML",
  },
];
