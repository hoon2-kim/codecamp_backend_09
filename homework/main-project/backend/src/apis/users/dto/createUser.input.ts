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

  @Field(() => String)
  phone: string;

  // 과제용 임시
  @Field(() => Int, { defaultValue: 0 })
  point: number;
}
