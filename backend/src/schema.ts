import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/adResolver";
import CategoryResolver from "./resolvers/categoryResolver";
import UserResolver from "./resolvers/userResolver";

export default buildSchema({
  resolvers: [AdResolver, CategoryResolver, UserResolver],
});
