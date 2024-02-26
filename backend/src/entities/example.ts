import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length } from "class-validator";
import { ObjectType, Field, Int, InputType } from "type-graphql";

@Entity()
@ObjectType()
export class Example extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;
}

@InputType()
export class NewExampleInput {
  @Field()
  @Length(3, 50)
  name: string;
}
