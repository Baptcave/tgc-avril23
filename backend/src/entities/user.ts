import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Length } from "class-validator";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Ad } from "./ad";

export enum UserRole {
  ADMIN = "admin",
  VISITOR = "visitor",
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  nickname: string;

  @Column()
  @Field()
  avatar: string;

  @Column()
  hashedPassword: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.VISITOR })
  @Field()
  role: UserRole;

  @OneToMany(() => Ad, (ad) => ad.owner)
  ads: Ad[];
}

/*
@InputType()
export class NewTagInput {
  @Field()
  @Length(3, 50)
  name: string;
}
*/
