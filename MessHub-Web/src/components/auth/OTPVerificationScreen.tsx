"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import { ArrowLeft, Shield, RefreshCw, ChefHat, Mail } from "lucide-react"
import type { AuthScreen, AuthState } from "../../types/auth"

interface OTPVerificationScreenProps {
  onNavigate: (screen: AuthScreen, state?: any) => void
  authState: AuthState
}

export function OTPVerificationScreen({ onNavigate, authState }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOTP = async () => {
    const otpString = otp.join("")
    if (otpString.length !== 6) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (authState.resetFlow) {
        onNavigate("reset-password", { email: authState.email, otp: otpString })
      } else {
        onNavigate("success")
      }
    }, 2000)
  }

  const handleResendOTP = () => {
    setTimeLeft(60)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
    // Simulate resend API call
    alert("New OTP sent to your email!")
  }

  const isOtpComplete = otp.every((digit) => digit !== "")

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
            <h1 className="text-5xl font-bold text-white leading-tight">Verify Your<br />Identity</h1>
            <p className="text-xl text-white/80 max-w-md">Enter the verification code we sent to your email</p>
            
            {/* Security Info for Laptop */}
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md">
                <h3 className="text-white text-xl font-semibold mb-4">Secure Verification</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Check Your Email</h4>
                      <p className="text-white/80 text-sm">We sent a code to {authState.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Shield size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">6-Digit Code</h4>
                      <p className="text-white/80 text-sm">Enter the code to verify your identity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <RefreshCw size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Code Expires</h4>
                      <p className="text-white/80 text-sm">Request a new code if needed</p>
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
            onClick={() => onNavigate(authState.resetFlow ? "forgot-password" : "register")}
            className="text-white hover:bg-white/20 rounded-full p-2 sm:p-3 transition-all duration-300"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </Button>
        </div>
        <div className="relative z-10 px-4 sm:px-6 pb-6 sm:pb-8">
          <h1 className="text-white text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Verify Code</h1>
          <p className="text-white/80 text-base sm:text-lg">Enter the 6-digit code we sent</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 right-4 sm:top-20 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-lg"></div>
      </div>

      {/* Form Container - Adjusted for both mobile and laptop */}
      <div className="px-4 sm:px-6 lg:px-0 lg:ml-auto lg:w-1/2 lg:max-w-xl lg:py-12 lg:pr-12 relative">
        <div className="lg:hidden -mt-6 sm:-mt-8 relative z-20 pb-6">
          <Card className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-0">
            <VerificationForm 
              otp={otp}
              handleOtpChange={handleOtpChange}
              handleKeyDown={handleKeyDown}
              inputRefs={inputRefs}
              isLoading={isLoading}
              timeLeft={timeLeft}
              canResend={canResend}
              handleVerifyOTP={handleVerifyOTP}
              handleResendOTP={handleResendOTP}
              onNavigate={onNavigate}
              authState={authState}
            />
          </Card>
        </div>

        {/* Laptop Form */}
        <div className="hidden lg:block h-full">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Identity</h2>
            <p className="text-gray-600 mb-8">Enter the 6-digit code sent to your email</p>
            
            <VerificationForm 
              otp={otp}
              handleOtpChange={handleOtpChange}
              handleKeyDown={handleKeyDown}
              inputRefs={inputRefs}
              isLoading={isLoading}
              timeLeft={timeLeft}
              canResend={canResend}
              handleVerifyOTP={handleVerifyOTP}
              handleResendOTP={handleResendOTP}
              onNavigate={onNavigate}
              authState={authState}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface VerificationFormProps {
  otp: string[]
  handleOtpChange: (index: number, value: string) => void
  handleKeyDown: (index: number, e: React.KeyboardEvent) => void
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
  isLoading: boolean
  timeLeft: number
  canResend: boolean
  handleVerifyOTP: () => void
  handleResendOTP: () => void
  onNavigate: (screen: AuthScreen, state?: any) => void
  authState: AuthState
}

// Extracted Verification Form Component
function VerificationForm({
  otp,
  handleOtpChange,
  handleKeyDown,
  inputRefs,
  isLoading,
  timeLeft,
  canResend,
  handleVerifyOTP,
  handleResendOTP,
  onNavigate,
  authState
}: VerificationFormProps) {
  const isOtpComplete = otp.every((digit) => digit !== "")

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Icon and Description */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#48A6A7] to-[#3d8a8b] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
          <Shield className="text-white" size={24} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Verification Code</h2>
        <p className="text-sm sm:text-base text-gray-600 px-2">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-[#48A6A7] break-all">{authState.email}</span>
        </p>
      </div>

      {/* Mobile-Optimized OTP Input */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#48A6A7] focus:bg-white transition-all duration-300 touch-manipulation"
          />
        ))}
      </div>

      {/* Timer and Resend */}
      <div className="text-center mb-4 sm:mb-6">
        {!canResend ? (
          <p className="text-sm sm:text-base text-gray-600">
            Resend code in{" "}
            <span className="font-semibold text-[#48A6A7]">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </p>
        ) : (
          <Button
            variant="ghost"
            onClick={handleResendOTP}
            className="text-[#48A6A7] hover:text-[#3d8a8b] hover:bg-transparent font-semibold flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            <RefreshCw size={14} className="sm:w-4 sm:h-4" />
            Resend Code
          </Button>
        )}
      </div>

      {/* Mobile-Optimized Verify Button */}
      <Button
        onClick={handleVerifyOTP}
        disabled={!isOtpComplete || isLoading}
        className="w-full bg-gradient-to-r from-[#48A6A7] to-[#3d8a8b] hover:from-[#3d8a8b] hover:to-[#48A6A7] text-white rounded-lg sm:rounded-xl py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Verifying...
          </div>
        ) : (
          "Verify Code"
        )}
      </Button>

      {/* Help Text */}
      <div className="text-center pt-3 sm:pt-4">
        <p className="text-xs sm:text-sm text-gray-500 px-2">
          {"Didn't receive the code? Check your spam folder or "}
          <Button
            variant="ghost"
            onClick={() => onNavigate("forgot-password")}
            className="text-[#48A6A7] hover:text-[#3d8a8b] hover:bg-transparent p-0 h-auto text-xs sm:text-sm font-semibold"
          >
            try again
          </Button>
        </p>
      </div>
    </div>
  )
}
