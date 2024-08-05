import { Field, InputType, ObjectType } from "type-graphql";

// @InputType()
// export class UserInputT {
//   @Field()
//   username: string
//
//   @Field()
//   email: string
//
//   @Field()
//   password: string
//
// }


@ObjectType()
@InputType()
export class UserT {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  avatar: string
}

