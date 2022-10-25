import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  birth: string;

  @Field(() => String)
  gender: string;

  // @Field(() => String, { defaultValue: 'Bronze' })
  // userGrade: string;

  @Field(() => Boolean, { nullable: true })
  isSocialUser: boolean;

  @Field(() => String)
  phone: string;
}
