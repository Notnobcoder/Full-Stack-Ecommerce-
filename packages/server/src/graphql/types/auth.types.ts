import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class AuthInputT {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string

}


@ObjectType()
export class AuthT {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string

}



@ObjectType()
export class AuthTS {
  @Field()
  email: string

  @Field()
  password: string

}



@InputType()
export class AuthTInputS {
  @Field()
  email: string

  @Field()
  password: string

}

@InputType()
export class DeleteInputT {
  @Field()
  email: string


}

