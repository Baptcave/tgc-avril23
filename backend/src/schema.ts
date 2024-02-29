import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/adResolver";

export default buildSchema({ resolvers: [AdResolver] });
