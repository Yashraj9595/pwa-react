"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card } from "../ui/card"
import { ArrowLeft, Eye, EyeOff, Lock, AlertCircle, KeyRound, ChefHat } from "lucide-react"
import type { AuthScreen, AuthState } from "../../types/auth"

interface ResetPasswordScreenProps {
  onNavigate: (screen: AuthScreen, state?: any) => void
  authState: AuthState
}

export function ResetPasswordScreen({ onNavigate, authState }: ResetPasswordScreenProps) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleResetPassword = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onNavigate("success", { resetSuccess: true })
    }, 2000)
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

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
            <h1 className="text-5xl font-bold text-white leading-tight">Create New<br />Password</h1>
            <p className="text-xl text-white/80 max-w-md">Set up a strong password to secure your account</p>
            
            {/* Password Tips for Laptop */}
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md">
                <h3 className="text-white text-xl font-semibold mb-4">Password Tips</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Lock size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Strong Password</h4>
                      <p className="text-white/80 text-sm">Use a mix of letters, numbers, and symbols</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <AlertCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Unique Password</h4>
                      <p className="text-white/80 text-sm">Don't reuse passwords from other accounts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <KeyRound size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Remember It</h4>
                      <p className="text-white/80 text-sm">Store your password in a secure location</p>
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
            onClick={() => onNavigate("otp-verification", authState)}
            className="text-white hover:bg-white/20 rounded-full p-2 sm:p-3 transition-all duration-300"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </Button>
        </div>
        <div className="relative z-10 px-4 sm:px-6 pb-6 sm:pb-8">
          <h1 className="text-white text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">New Password</h1>
          <p className="text-white/80 text-base sm:text-lg">Create a strong, secure password</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 right-4 sm:top-20 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-lg"></div>
      </div>

      {/* Form Container - Adjusted for both mobile and laptop */}
      <div className="px-4 sm:px-6 lg:px-0 lg:ml-auto lg:w-1/2 lg:max-w-xl lg:py-12 lg:pr-12 relative">
        <div className="lg:hidden -mt-6 sm:-mt-8 relative z-20 pb-6">
          <Card className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-0">
            <ResetPasswordForm 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              isLoading={isLoading}
              handleResetPassword={handleResetPassword}
            />
          </Card>
        </div>

        {/* Laptop Form */}
        <div className="hidden lg:block h-full">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create New Password</h2>
            <p className="text-gray-600 mb-8">Choose a strong password to protect your account</p>
            
            <ResetPasswordForm 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              isLoading={isLoading}
              handleResetPassword={handleResetPassword}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResetPasswordFormProps {
  formData: {
    password: string
    confirmPassword: string
  }
  setFormData: React.Dispatch<React.SetStateAction<{ password: string; confirmPassword: string }>>
  errors: Record<string, string>
  showPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
  showConfirmPassword: boolean
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  handleResetPassword: () => void
}

// Extracted Reset Password Form Component
function ResetPasswordForm({
  formData,
  setFormData,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isLoading,
  handleResetPassword
}: ResetPasswordFormProps) {
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

  return (
    <div className="space-y-6">
      {/* Icon and Description */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#48A6A7] to-[#3d8a8b] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <KeyRound className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Your Password</h2>
        <p className="text-gray-600">Enter a new password for your account</p>
      </div>

      {/* New Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center gap-2">
          <Lock size={16} className="text-[#48A6A7]" />
          New Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`bg-gray-50 border-2 rounded-xl py-3 px-4 pr-12 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white ${
              errors.password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#48A6A7]"
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#48A6A7] transition-colors duration-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    passwordStrength >= level ? strengthColors[passwordStrength - 1] : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p
              className={`text-sm font-medium ${
                passwordStrength >= 3
                  ? "text-green-600"
                  : passwordStrength >= 2
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              Password strength: {strengthLabels[passwordStrength] || "Very Weak"}
            </p>
          </div>
        )}

        {errors.password && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700 font-semibold flex items-center gap-2">
          <Lock size={16} className="text-[#48A6A7]" />
          Confirm New Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`bg-gray-50 border-2 rounded-xl py-3 px-4 pr-12 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white ${
              errors.confirmPassword
                ? "border-red-300 focus:border-red-500"
                : "border-gray-200 focus:border-[#48A6A7]"
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#48A6A7] transition-colors duration-300"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Password Requirements */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-700 mb-2">Password Requirements:</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className={`flex items-center gap-2 ${formData.password.length >= 6 ? "text-green-600" : ""}`}>
            <div
              className={`w-2 h-2 rounded-full ${formData.password.length >= 6 ? "bg-green-500" : "bg-gray-300"}`}
            ></div>
            At least 6 characters
          </li>
          <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-green-600" : ""}`}>
            <div
              className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
            ></div>
            One uppercase letter
          </li>
          <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? "text-green-600" : ""}`}>
            <div
              className={`w-2 h-2 rounded-full ${/[0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
            ></div>
            One number
          </li>
        </ul>
      </div>

      {/* Reset Button */}
      <Button
        onClick={handleResetPassword}
        disabled={isLoading || passwordStrength < 2}
        className="w-full bg-gradient-to-r from-[#48A6A7] to-[#3d8a8b] hover:from-[#3d8a8b] hover:to-[#48A6A7] text-white rounded-xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Updating Password...
          </div>
        ) : (
          "Update Password"
        )}
      </Button>

      {/* Help Text */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-500">Make sure to save your new password in a secure location</p>
      </div>
    </div>
  )
}
