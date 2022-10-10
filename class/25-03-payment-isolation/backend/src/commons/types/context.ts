// 타입스크립트 타입

export interface IUser {
  // user는 passport통해서만 생성되서 있을수도 없을수도
  user?: {
    email: string;
    id: string;
  };
}

export interface IContext {
  req: Request & IUser; // 이렇게하면 req안에 user가 있을수도 있다는 뜻
  res: Response;
}
