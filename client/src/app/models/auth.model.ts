export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  expiry: string;
}

export interface User {
  username: string;
  role: 'Admin' | 'Staff';
}
