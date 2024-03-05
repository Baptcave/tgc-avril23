import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Length } from 'class-validator';
import { ObjectType, Field, Int, InputType } from 'type-graphql';
import { Ad } from './ad';

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Ad)
  ads: Ad[];
}

@InputType()
export class NewTagInput {
  @Field()
  @Length(3, 50)
  name: string;
}
