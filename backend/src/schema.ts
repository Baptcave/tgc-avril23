import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/adResolver";
import CategoryResolver from "./resolvers/categoryResolver";

export default buildSchema({ resolvers: [AdResolver, CategoryResolver] });
