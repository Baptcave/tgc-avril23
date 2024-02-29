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

/*
@InputType()
export class NewTagInput {
  @Field()
  @Length(3, 50)
  name: string;
}
*/
