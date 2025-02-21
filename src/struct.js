import * as s from "superstruct";
import isUuid from "is-uuid";

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));
export const CreateProduct = s.object({
  name: s.string(),
  description: s.string(),
  price: s.number(),
  tags: s.array(s.string()),
});
