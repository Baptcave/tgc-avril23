import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Ad, NewAdInput } from "../entities/ad";
import { User } from "../entities/user";
//import { Example, NewExampleInput } from "../entities/example";

@Resolver()
class AdResolver {
  @Query(() => [Ad])
  async ads() {
    return Ad.find({ relations: { category: true, owner: true, tags: true } });
  }

  @Mutation(() => Ad)
  async createAd(@Arg("data") data: NewAdInput) {
    const owner = await User.findOneOrFail({ where: { id: 1 } });
    const newAd = await Ad.create({ ...data, owner }).save();
    return Ad.findOne({
      relations: { category: true, owner: true, tags: true },
      where: { id: newAd.id },
    });
  }
}

export default AdResolver;
