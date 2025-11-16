export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  rol_id: number;
  created_at: string;
  badge: string;
  status: string;
}

export type IPartialUser = Omit<
  IUser,
  'created_at' | 'badge' | 'id' | 'status'
>;

export type TUserList = Array<IUser>;
