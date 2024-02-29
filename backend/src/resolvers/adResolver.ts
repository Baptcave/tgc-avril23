import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Ad } from "../entities/ad";
//import { Example, NewExampleInput } from "../entities/example";

@Resolver()
class AdResolver {
  @Query(() => [Ad])
  async ads() {
    return Ad.find({ relations: { category: true, owner: true, tags: true } });
  }

  @Mutation(() => String)
  async createAd() {
    return "ok";
  }
}

export default AdResolver;
