import { User } from 'src/apis/users/entities/user.entity';

export interface IUser {
  user?: {
    email: string;
    id: string;
  };
}

export interface IContext {
  req: Request & IUser;
  res: Response;
}

export interface IOAuthUser {
  user: Pick<
    User,
    | 'email'
    | 'name'
    | 'birth'
    | 'gender'
    | 'userGrade'
    | 'pointTotal'
    | 'phone'
    | 'password'
  >;
}
