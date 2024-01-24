export interface UserSession {
  _user: {
    user_id: number;
    email: string;
  };
  _employee?: {
    employee_id: number;
    rol_id: number;
    employee_uniq_id: string;
    start_date: Date;
    end_date?: string | null;
    credentials_status: number;
    status: number;
  };
}
