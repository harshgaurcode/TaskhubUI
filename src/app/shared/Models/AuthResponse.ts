export interface AuthResult {
  user: {
    userName: string;
    roleId: string | null;
    teamId: string;
  };
  token: string;
}
