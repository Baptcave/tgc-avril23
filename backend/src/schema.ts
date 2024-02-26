import { buildSchema } from "type-graphql";
import ExampleResolver from "./resolvers/exampleResolver";

export default buildSchema({ resolvers: [ExampleResolver] });
