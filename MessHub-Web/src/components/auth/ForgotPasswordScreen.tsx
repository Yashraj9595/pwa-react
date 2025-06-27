"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card } from "../ui/card"
import { ArrowLeft, Mail, AlertCircle, Send, ChefHat } from "lucide-react"
import type { AuthScreen } from "../../types/auth"

interface ForgotPasswordScreenProps {
  onNavigate: (screen: AuthScreen, state?: any) => void
}

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = () => {
    if (!email) {
      setError("Email is required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email")
      return false
    }
    setError("")
    return true
  }

  const handleSendOTP = async () => {
    if (!validateEmail()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onNavigate("otp-verification", { email, resetFlow: true })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Split Screen Layout for Laptop */}
      <div className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#48A6A7] to-[#3d8a8b] p-8">
        <div className="h-full flex flex-col justify-between relative z-10 py-8">
          {/* Brand Section */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <ChefHat size={20} className="text-white" />
              <span className="text-sm font-medium text-white">MessMaster Platform</span>
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white leading-tight">Reset Your<br />Password</h1>
            <p className="text-xl text-white/80 max-w-md">Don't worry! We'll help you recover your account access</p>
            
            {/* Security Info for Laptop */}
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md">
                <h3 className="text-white text-xl font-semibold mb-4">Secure Recovery Process</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Email Verification</h4>
                      <p className="text-white/80 text-sm">We'll send a secure code to your email</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <AlertCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Quick & Easy</h4>
                      <p className="text-white/80 text-sm">Reset your password in minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Send size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Instant Access</h4>
                      <p className="text-white/80 text-sm">Get back to your account quickly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-white/60 text-sm">
            © 2024 MessMaster. All rights reserved.
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Mobile Header - Only shown on mobile */}
      <div className="lg:hidden relative bg-gradient-to-br from-[#48A6A7] to-[#3d8a8b] h-64 sm:h-72 rounded-b-[40px] sm:rounded-b-[60px] shadow-2xl">
        <div className="absolute inset-0 bg-black/10 rounded-b-[40px] sm:rounded-b-[60px]"></div>
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 pt-12 sm:pt-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("login")}
            className="text-white hover:bg-white/20 rounded-full p-2 sm:p-3 transition-all duration-300"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </Button>
        </div>
        <div className="relative z-10 px-4 sm:px-6 pb-6 sm:pb-8">
          <h1 className="text-white text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Reset Password</h1>
          <p className="text-white/80 text-base sm:text-lg">{"We'll send you a reset code"}</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 right-4 sm:top-20 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-lg"></div>
      </div>

      {/* Form Container - Adjusted for both mobile and laptop */}
      <div className="px-4 sm:px-6 lg:px-0 lg:ml-auto lg:w-1/2 lg:max-w-xl lg:py-12 lg:pr-12 relative">
        <div className="lg:hidden -mt-6 sm:-mt-8 relative z-20 pb-6">
          <Card className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-0">
            <ResetForm 
              email={email}
              setEmail={setEmail}
              error={error}
              isLoading={isLoading}
              onNavigate={onNavigate}
              handleSendOTP={handleSendOTP}
            />
          </Card>
        </div>

        {/* Laptop Form */}
        <div className="hidden lg:block h-full">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
            <p className="text-gray-600 mb-8">Don't worry, we'll help you recover your account</p>
            
            <ResetForm 
              email={email}
              setEmail={setEmail}
              error={error}
              isLoading={isLoading}
              onNavigate={onNavigate}
              handleSendOTP={handleSendOTP}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResetFormProps {
  email: string
  setEmail: (email: string) => void
  error: string
  isLoading: boolean
  onNavigate: (screen: AuthScreen) => void
  handleSendOTP: () => void
}

// Extracted Reset Form Component
function ResetForm({
  email,
  setEmail,
  error,
  isLoading,
  onNavigate,
  handleSendOTP
}: ResetFormProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Icon and Description */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#48A6A7] to-[#3d8a8b] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
          <Send className="text-white" size={24} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Forgot Your Password?</h2>
        <p className="text-sm sm:text-base text-gray-600 px-2">
          {"Don't worry! Enter your email address and we'll send you a code to reset your password."}
        </p>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label
          htmlFor="reset-email"
          className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base"
        >
          <Mail size={14} className="sm:w-4 sm:h-4 text-[#48A6A7]" />
          Email Address
        </Label>
        <div className="relative">
          <Input
            id="reset-email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-gray-50 border-2 rounded-lg sm:rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white text-sm sm:text-base touch-manipulation ${
              error ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#48A6A7]"
            }`}
          />
          {error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle size={16} className="text-red-500" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <AlertCircle size={12} />
            {error}
          </p>
        )}
      </div>

      {/* Send Button */}
      <Button
        onClick={handleSendOTP}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#48A6A7] to-[#3d8a8b] hover:from-[#3d8a8b] hover:to-[#48A6A7] text-white rounded-lg sm:rounded-xl py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Sending Code...
          </div>
        ) : (
          "Send Reset Code"
        )}
      </Button>

      {/* Back to Login */}
      <div className="text-center pt-3 sm:pt-4">
        <p className="text-sm sm:text-base text-gray-600">
          Remember your password?{" "}
          <Button
            variant="ghost"
            onClick={() => onNavigate("login")}
            className="text-[#48A6A7] hover:text-[#3d8a8b] hover:bg-transparent p-0 h-auto font-semibold text-sm sm:text-base"
          >
            Sign In
          </Button>
        </p>
      </div>
    </div>
  )
}
