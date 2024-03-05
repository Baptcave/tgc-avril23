import { Resolver, Query } from 'type-graphql';
import { Category } from '../entities/category';

@Resolver()
class CategoryResolver {
  @Query(() => [Category])
  async categories() {
    return Category.find();
  }
}

export default CategoryResolver;
