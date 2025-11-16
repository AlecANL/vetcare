export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  rol_id: number;
  status: string;
  created_at: Date;
}

export type IRawUser = Omit<IUser, 'created_at' | 'id' | 'status'>;

export type TUserList = Array<IUser>;
