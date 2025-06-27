"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card } from "../ui/card"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, AlertCircle, Users, ChefHat, Star } from "lucide-react"
import type { AuthScreen, UserRole } from "../../types/auth"

interface RegisterScreenProps {
  onNavigate: (screen: AuthScreen, state?: any) => void
}

export function RegisterScreen({ onNavigate }: RegisterScreenProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const roles = [
    {
      id: "user" as UserRole,
      title: "Food Lover",
      description: "Browse menus and place orders",
      icon: Users,
    },
    {
      id: "mess_owner" as UserRole,
      title: "Mess Owner",
      description: "Manage your kitchen and orders",
      icon: ChefHat,
    },
  ]

  const validateStep1 = () => {
    return selectedRole !== null
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleRegister = async () => {
    if (!validateStep2()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onNavigate("success", { role: selectedRole })
    }, 2000)
  }

  const RoleSelectionStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Choose Your Role</h2>
        <p className="text-sm sm:text-base text-gray-600">Select how you want to use our platform</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {selectedRole ? (
          // Show only selected role as a button
          <Card
            className="p-4 sm:p-6 cursor-pointer transition-all duration-300 border-2 border-[#48A6A7] bg-gradient-to-br from-[#48A6A7]/10 to-[#48A6A7]/5 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => setSelectedRole(null)}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-xl bg-[#48A6A7] text-white">
                {selectedRole === "user" ? <Users size={20} /> : <ChefHat size={20} />}
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold mb-1 text-[#48A6A7]">
                  {selectedRole === "user" ? "Food Lover" : "Mess Owner"}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {selectedRole === "user" ? "Browse menus and place orders" : "Manage your kitchen and orders"}
                </p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-500">Tap to change selection</p>
            </div>
          </Card>
        ) : (
          // Show all roles for selection
          roles.map((role) => {
            const Icon = role.icon
            return (
              <Card
                key={role.id}
                className="p-4 sm:p-6 cursor-pointer transition-all duration-300 border-2 border-gray-200 hover:border-[#48A6A7]/50 hover:shadow-md hover:scale-105"
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-gray-100 text-gray-600">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 text-gray-800">{role.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{role.description}</p>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      <Button
        onClick={handleNext}
        disabled={!selectedRole}
        className="w-full bg-gradient-to-r from-[#48A6A7] to-[#3d8a8b] hover:from-[#3d8a8b] hover:to-[#48A6A7] text-white rounded-lg sm:rounded-xl py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation"
      >
        Continue
      </Button>
    </div>
  )

  const DetailsFormStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="inline-flex items-center gap-2 bg-[#48A6A7]/10 px-4 py-2 rounded-full mb-2 sm:mb-4">
        <User size={14} className="sm:w-4 sm:h-4 text-[#48A6A7]" />
        <span className="text-sm font-medium text-[#48A6A7]">Account Setup</span>
      </div>

      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
        <p className="text-sm sm:text-base text-gray-600">Fill in your details to get started</p>
      </div>

      {/* Full Name Field */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
          <User size={14} className="sm:w-4 sm:h-4 text-[#48A6A7]" />
          Full Name
        </Label>
        <div className="relative">
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`bg-gray-50 border-2 rounded-lg sm:rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white text-sm sm:text-base touch-manipulation ${
              errors.fullName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#48A6A7]"
            }`}
          />
          {errors.fullName && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle size={16} className="text-red-500" />
            </div>
          )}
        </div>
        {errors.fullName && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
          <Mail size={14} className="sm:w-4 sm:h-4 text-[#48A6A7]" />
          Email Address
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`bg-gray-50 border-2 rounded-lg sm:rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white text-sm sm:text-base touch-manipulation ${
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
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
          <Lock size={14} className="sm:w-4 sm:h-4 text-[#48A6A7]" />
          Create Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`bg-gray-50 border-2 rounded-lg sm:rounded-xl py-3 px-4 pr-12 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white text-sm sm:text-base touch-manipulation ${
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
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
          <Lock size={14} className="sm:w-4 sm:h-4 text-[#48A6A7]" />
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`bg-gray-50 border-2 rounded-lg sm:rounded-xl py-3 px-4 pr-12 text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:bg-white text-sm sm:text-base touch-manipulation ${
              errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#48A6A7]"
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
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#48A6A7] focus:ring-[#48A6A7]"
          />
          <label htmlFor="terms" className="text-sm sm:text-base text-gray-600">
            I agree to the{" "}
            <Button variant="ghost" className="p-0 h-auto text-[#48A6A7] hover:text-[#3d8a8b] font-semibold text-sm sm:text-base">
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="ghost" className="p-0 h-auto text-[#48A6A7] hover:text-[#3d8a8b] font-semibold text-sm sm:text-base">
              Privacy Policy
            </Button>
          </label>
        </div>
      </div>

      {/* Register Button */}
      <Button
        onClick={handleRegister}
        disabled={isLoading || !agreedToTerms}
        className="w-full bg-gradient-to-r from-[#48A6A7] to-[#3d8a8b] hover:from-[#3d8a8b] hover:to-[#48A6A7] text-white rounded-lg sm:rounded-xl py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </Button>

      {/* Sign In Link */}
      <div className="text-center pt-3 sm:pt-4">
        <p className="text-sm sm:text-base text-gray-600">
          Already have an account?{" "}
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
            <h1 className="text-5xl font-bold text-white leading-tight">Join the<br />MessMaster Family</h1>
            <p className="text-xl text-white/80 max-w-md">Create your account and start your journey with us</p>
            
            {/* Features for Laptop */}
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md">
                <h3 className="text-white text-xl font-semibold mb-4">Why Choose MessMaster?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Growing Community</h4>
                      <p className="text-white/80 text-sm">Join 25K+ satisfied users</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <ChefHat size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Quality Kitchens</h4>
                      <p className="text-white/80 text-sm">500+ verified mess partners</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Star size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Top Rated</h4>
                      <p className="text-white/80 text-sm">4.8/5 average rating</p>
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
            onClick={() => onNavigate("welcome")}
            className="text-white hover:bg-white/20 rounded-full p-2 sm:p-3 transition-all duration-300"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </Button>
        </div>
        <div className="relative z-10 px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-2 sm:mb-4">
            <ChefHat size={16} className="text-white" />
            <span className="text-sm font-medium text-white">MessMaster Platform</span>
          </div>
          <h1 className="text-white text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Join MessMaster</h1>
          <p className="text-white/80 text-base sm:text-lg">Create your account to get started</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 right-4 sm:top-20 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-lg"></div>
      </div>

      {/* Form Container - Adjusted for both mobile and laptop */}
      <div className="px-4 sm:px-6 lg:px-0 lg:ml-auto lg:w-1/2 lg:max-w-xl lg:py-12 lg:pr-12 relative">
        <div className="lg:hidden -mt-6 sm:-mt-8 relative z-20 pb-6">
          <Card className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-0">
            <div className="space-y-4 sm:space-y-6">
              {step === 1 ? (
                <RoleSelectionStep />
              ) : (
                <DetailsFormStep />
              )}
            </div>
          </Card>
        </div>

        {/* Laptop Form */}
        <div className="hidden lg:block h-full">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600 mb-8">Join our community and start your journey</p>
            
            <div className="space-y-6">
              {step === 1 ? (
                <RoleSelectionStep />
              ) : (
                <DetailsFormStep />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
