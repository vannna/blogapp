export interface AuthResponseDto {
  token: string;
  username: string;
  role: string;
  email: string;
  bio?: string;
}
