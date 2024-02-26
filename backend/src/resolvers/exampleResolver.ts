import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Example, NewExampleInput } from "../entities/example";

@Resolver(Example)
class ExampleResolver {
  @Query(() => [Example])
  async examples() {
    return Example.find();
  }

  @Mutation(() => Example)
  async createExample(@Arg("data", { validate: true }) data: NewExampleInput) {
    console.log("recieved : ", { data });
    return Example.create({ name: data.name }).save();
  }
}

export default ExampleResolver;
