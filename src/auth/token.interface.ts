export interface Token {
  payload: {
    user_id: number;
    employee_id?: number;
    email: string;
    stores_id?: number[];
    franchise_id?: number;
    role_id: number;
    role_name?: string;
  };
  prm?: string[];
  iat: number;
  exp: number;
  iss: string;
  jti: string;
}
