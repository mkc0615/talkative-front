import { z } from 'zod';
import apiClient from './api';

const UserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  isOnline: z.boolean(),
});

const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserResponseSchema,
});

export type User = z.infer<typeof UserResponseSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
    const authData = AuthResponseSchema.parse(response.data);
    localStorage.setItem('auth_token', authData.token);
    return authData;
  },

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post('/api/auth/register', {
      username,
      email,
      password,
    });
    const authData = AuthResponseSchema.parse(response.data);
    localStorage.setItem('auth_token', authData.token);
    return authData;
  },

  async logout(): Promise<void> {
    await apiClient.post('/api/auth/logout');
    localStorage.removeItem('auth_token');
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/api/auth/me');
    return UserResponseSchema.parse(response.data);
  },

  async refreshToken(): Promise<string> {
    const response = await apiClient.post('/api/auth/refresh');
    const token = z.string().parse(response.data.token);
    localStorage.setItem('auth_token', token);
    return token;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },
};