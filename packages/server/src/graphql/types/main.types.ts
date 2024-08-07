import { Field, ID, InputType, ObjectType } from "type-graphql";

// If you are using a custom scalar for Date, import it
// import { GraphQLDate } from "graphql-iso-date"; 

@InputType()
export class ProductInputT {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  imageKey: string;

  @Field()
  description: string;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field()
  taxable: boolean;

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  created?: Date;

  @Field({ nullable: true })
  updated?: Date;
}



@ObjectType()
export class ProductT {

  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  imageKey: string;

  @Field()
  description: string;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field()
  taxable: boolean;

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  created?: Date;

  @Field({ nullable: true })
  updated?: Date;

}
