import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Length } from "class-validator";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Ad } from "./ad";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}

@InputType()
export class NewCategoryInput {
  @Field()
  @Length(3, 50)
  name: string;
}
