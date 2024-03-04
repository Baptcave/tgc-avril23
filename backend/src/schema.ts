import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/adResolver";
import CategoryResolver from "./resolvers/categoryResolver";
import UserResolver from "./resolvers/userResolver";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import env from "./env";
import { User } from "./entities/user";

export default buildSchema({
  resolvers: [AdResolver, CategoryResolver, UserResolver],
  authChecker: async ({ root, args, context, info }, roles = []) => {
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const token = cookies.token;

    console.log({ cookies }, context.req.headers);

    try {
      const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as any;
      const id = decoded.userId;
      const currentUser = await User.findOneOrFail({ where: { id } });
      context.currentUser = currentUser;
    } catch (err) {
      return false;
    }

    return roles.length === 0 || roles.includes(context?.currentUser?.role);
  },
});
