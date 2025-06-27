"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card } from "../ui/card"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, AlertCircle, ChefHat, Users, Star } from "lucide-react"
import type { AuthScreen } from "../../types/auth"

interface LoginScreenProps {
  onNavigate: (screen: AuthScreen) => void
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to success or dashboard
      onNavigate("success")
    }, 2000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed Curved Header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <div className="relative bg-gradient-to-br from-[#48A6A7] to-[#3d8a8b] h-80 rounded-b-[60px] shadow-2xl">
          <div className="absolute inset-0 bg-black/10 rounded-b-[60px]"></div>
          <div className="relative z-10 flex items-center justify-between p-6 pt-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("welcome")}
              className="text-white hover:bg-white/20 rounded-full p-3 transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </Button>
          </div>
          <div className="relative z-10 px-6 pb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
              <ChefHat size={16} className="text-white" />
              <span className="text-sm font-medium text-white">MessMaster Platform</span>
            </div>
            <h1 className="text-white text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-white/80 text-lg">Sign in to continue your culinary journey</p>
          </div>

          {/* Enhanced Decorative Elements */}
          <div className="absolute top-20 right-8 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 left-8 w-20 h-20 bg-white/10 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
          <div className="absolute top-32 left-12 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse animation-delay-500"></div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="fixed bottom-0 left-0 right-0 top-80 px-6 z-20">
        <div className="h-full -mt-8">
          <Card className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border-0 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-8">
              {/* Platform Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-3 bg-gradient-to-br from-[#48A6A7]/10 to-[#48A6A7]/5 rounded-xl">
                  <Users size={20} className="text-[#48A6A7] mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-800">25K+</div>
                  <div className="text-xs text-gray-600">Users</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-[#48A6A7]/10 to-[#48A6A7]/5 rounded-xl">
                  <ChefHat size={20} className="text-[#48A6A7] mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-800">500+</div>
                  <div className="text-xs text-gray-600">Kitchens</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-[#48A6A7]/10 to-[#48A6A7]/5 rounded-xl">
                  <Star size={20} className="text-[#48A6A7] mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-800">4.8</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Mail size={16} className="text-[#48A6A7]" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`bg-gray-50 border-2 rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg ${
                      errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#48A6A7]"
                    }`}
                  />
                  {errors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle size={16} className="text-red-500" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Lock size={16} className="text-[#48A6A7]" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`bg-gray-50 border-2 rounded-xl py-3 px-4 pr-12 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg ${
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
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate("forgot-password")}
                  className="text-[#48A6A7] hover:text-[#3d8a8b] hover:bg-transparent p-0 h-auto font-semibold"
                >
                  Forgot Password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#48A6A7] to-[#3d8a8b] hover:from-[#3d8a8b] hover:to-[#48A6A7] text-white rounded-xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In to MessMaster"
                )}
              </Button>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  {"Don't have an account? "}
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate("register")}
                    className="text-[#48A6A7] hover:text-[#3d8a8b] hover:bg-transparent p-0 h-auto font-semibold"
                  >
                    Create Account
                  </Button>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
