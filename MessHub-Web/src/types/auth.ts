export type AuthScreen =
  | "welcome"
  | "login"
  | "register"
  | "forgot-password"
  | "otp-verification"
  | "reset-password"
  | "success"

export type UserRole = "user" | "mess_owner"

export interface AuthState {
  email?: string
  otp?: string
  role?: UserRole
  resetFlow?: boolean
  resetSuccess?: boolean
}
