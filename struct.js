import * as s from "superstruct";
import isUuid from "is-uuid";

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));
export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 30),
  description: s.size(s.string(), 1, 50),
  price: s.min(s.number(0)),
  tags: s.array(s.string()),
});

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 30),
  content: s.size(s.string(), 1, 50),
});
