import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user";
import { Tag } from "./tag";
import { Length } from "class-validator";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Category } from "./category";
import { ObjectId } from "../utils";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ type: "text" })
  @Field()
  description: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  picture: string;

  @Column({ type: "float" })
  @Field()
  price: number;

  @ManyToOne(() => Category, (category) => category.ads)
  @Field()
  category: Category;

  @ManyToOne(() => User, (user) => user.ads)
  @Field()
  owner: User;

  @ManyToMany(() => Tag, (t) => t.ads, { cascade: true })
  @JoinTable()
  @Field(() => [Tag])
  tags: Tag[];
}

@InputType()
export class NewAdInput {
  @Field()
  @Length(3, 50)
  title: string;

  @Field()
  @Length(0, 1000)
  description: string;

  @Field()
  picture: string;

  @Field()
  price: number;

  @Field()
  location: string;

  @Field(() => ObjectId)
  category: ObjectId;
}
