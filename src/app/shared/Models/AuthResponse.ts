export interface AuthResult {
  user: {
    userName: string;
    roleId: string | null;
  };
  token: string;
}
