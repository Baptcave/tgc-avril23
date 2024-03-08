import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Authorized,
  Ctx,
  Int,
} from 'type-graphql';
import { Ad, NewAdInput } from '../entities/ad';
import { User } from '../entities/user';
import { ContextType } from '../types';
import { UnauthenticatedError, NotFoundError } from '../utils';
import { ILike, In } from 'typeorm';

@Resolver()
class AdResolver {
  @Query(() => [Ad])
  async ads(
    @Arg('tagsId', { nullable: true }) tagIds?: string,
    @Arg('categoryId', () => Int, { nullable: true }) categoryId?: number,
    @Arg('ownerId', () => Int, { nullable: true }) ownerId?: number,
    @Arg('title', { nullable: true }) title?: string
  ) {
    return Ad.find({
      relations: { category: true, tags: true },
      where: {
        tags: {
          id:
            typeof tagIds === 'string' && tagIds.length > 0
              ? In(tagIds.split(',').map((t) => parseInt(t, 10)))
              : undefined,
        },
        title: title ? ILike(`%${title}%`) : undefined,
        category: {
          id: categoryId,
        },
        owner: {
          id: ownerId,
        },
      },
    });
  }

  @Query(() => Ad)
  async ad(@Arg('adId') adId: number) {
    return Ad.findOne({
      relations: { category: true, owner: true, tags: true },
      where: { id: adId },
    });
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Arg('data', { validate: true }) data: NewAdInput,
    @Ctx() ctx: ContextType
  ) {
    if (typeof ctx.currentUser === 'undefined') throw UnauthenticatedError();

    const owner = await User.findOneOrFail({
      where: { id: ctx?.currentUser?.id },
    });

    const newAd = await Ad.create({ ...data, owner }).save();

    return Ad.findOne({
      relations: { category: true, owner: true, tags: true },
      where: { id: newAd.id },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deleteAd(
    @Arg('adId') adId: number,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    if (typeof ctx.currentUser === 'undefined') throw UnauthenticatedError();

    const adToDelete = await Ad.findOne({
      where: { id: adId },
      relations: { owner: true },
    });

    if (!adToDelete) throw NotFoundError();

    if (
      ctx.currentUser.role !== 'admin' &&
      adToDelete?.owner.id !== ctx.currentUser.id
    ) {
      throw new Error('You are not allowed to delete this ad');
    }

    await adToDelete.remove();

    return 'Ad deleted successfully!';
  }
}

export default AdResolver;
