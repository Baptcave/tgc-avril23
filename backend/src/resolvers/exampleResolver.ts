import { Resolver, Query, Arg, Mutation } from "type-graphql";
//import { Example, NewExampleInput } from "../entities/example";

@Resolver()
class ExampleResolver {
  @Query(() => String)
  async examples() {
    return "ok";
  }

  @Mutation(() => String)
  async createExample() {
    return "ok";
  }
}

export default ExampleResolver;
