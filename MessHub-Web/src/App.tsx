"use client"

import { useState } from "react"
import { WelcomeScreen } from "./components/auth/WelcomeScreen"
import { LoginScreen } from "./components/auth/LoginScreen"
import { RegisterScreen } from "./components/auth/RegisterScreen"
import { ForgotPasswordScreen } from "./components/auth/ForgotPasswordScreen"
import { OTPVerificationScreen } from "./components/auth/OTPVerificationScreen"
import { ResetPasswordScreen } from "./components/auth/ResetPasswordScreen"
import { SuccessScreen } from "./components/auth/SuccessScreen"
import type { AuthScreen, AuthState } from "./types/auth"

function App() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>("welcome")
  const [authState, setAuthState] = useState<AuthState>({})

  const navigateToScreen = (screen: AuthScreen, state?: Partial<AuthState>) => {
    setCurrentScreen(screen)
    if (state) {
      setAuthState((prev) => ({ ...prev, ...state }))
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNavigate={navigateToScreen} />
      case "login":
        return <LoginScreen onNavigate={navigateToScreen} />
      case "register":
        return <RegisterScreen onNavigate={navigateToScreen} />
      case "forgot-password":
        return <ForgotPasswordScreen onNavigate={navigateToScreen} />
      case "otp-verification":
        return <OTPVerificationScreen onNavigate={navigateToScreen} authState={authState} />
      case "reset-password":
        return <ResetPasswordScreen onNavigate={navigateToScreen} authState={authState} />
      case "success":
        return <SuccessScreen onNavigate={navigateToScreen} authState={authState} />
      default:
        return <WelcomeScreen onNavigate={navigateToScreen} />
    }
  }

  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">{renderScreen()}</div>
}

export default App
