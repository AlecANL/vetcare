export interface LoginRequest {
  email: string;
  password: string;
}

export interface IUserLogin {
  id: number;
  name: string;
  email: string;
  password: string;
  rol_id: number;
  created_at: Date;
  status: string;
}
