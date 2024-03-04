import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { NewUserInput, User, hashPassword } from "../entities/user";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg("data", { validate: true }) data: NewUserInput) {
    const hashedPassword = await hashPassword(data.password);
    return User.create({
      nickname: data.nickname,
      email: data.email,
      hashedPassword,
    }).save();
  }
}

export default UserResolver;
