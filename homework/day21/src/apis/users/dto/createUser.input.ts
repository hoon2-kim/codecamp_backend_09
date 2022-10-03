import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  birth: string;

  @Field(() => String)
  gender: string;

  @Field(() => String, { defaultValue: 'Bronze' })
  userGrade: string;

  @Field(() => Int, { defaultValue: 0 })
  pointTotal: number;

  @Field(() => String)
  phone: string;
}
