"use client"

import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { CheckCircle, ArrowRight, Home, User, Store, ChefHat, UserPlus, Utensils, Bell } from "lucide-react"
import type { AuthScreen, AuthState } from "../../types/auth"

interface SuccessScreenProps {
  onNavigate: (screen: AuthScreen) => void
  authState: AuthState
}

export function SuccessScreen({ onNavigate, authState }: SuccessScreenProps) {
  const isPasswordReset = authState.resetSuccess
  const isRegistration = authState.role

  const getSuccessContent = () => {
    if (isPasswordReset) {
      return {
        title: "Password Updated!",
        message: "Your password has been successfully updated. You can now sign in with your new password.",
        buttonText: "Sign In Now",
        action: () => onNavigate("login"),
      }
    }

    if (isRegistration) {
      return {
        title: "Welcome Aboard!",
        message: `Your ${authState.role === "mess_owner" ? "Mess Owner" : "Food Lover"} account has been created successfully. Let's get you started!`,
        buttonText: "Get Started",
        action: () => onNavigate("welcome"), // In real app, this would navigate to dashboard
      }
    }

    return {
      title: "Success!",
      message: "You have successfully signed in to your account.",
      buttonText: "Continue",
      action: () => onNavigate("welcome"),
    }
  }

  const content = getSuccessContent()

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
            <h1 className="text-5xl font-bold text-white leading-tight">Welcome to<br />MessMaster</h1>
            <p className="text-xl text-white/80 max-w-md">Your account has been successfully created</p>
            
            {/* Features for Laptop */}
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md">
                <h3 className="text-white text-xl font-semibold mb-4">What's Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <UserPlus size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Complete Your Profile</h4>
                      <p className="text-white/80 text-sm">Add your details and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Utensils size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Explore Meals</h4>
                      <p className="text-white/80 text-sm">Browse through our delicious menu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Bell size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Stay Updated</h4>
                      <p className="text-white/80 text-sm">Get notified about meal schedules</p>
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
        <div className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8">
          <h1 className="text-white text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Success!</h1>
          <p className="text-white/80 text-base sm:text-lg">Your account is ready to use</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 right-4 sm:top-20 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-lg"></div>
      </div>

      {/* Success Content - Adjusted for both mobile and laptop */}
      <div className="px-4 sm:px-6 lg:px-0 lg:ml-auto lg:w-1/2 lg:max-w-xl lg:py-12 lg:pr-12 relative">
        <div className="lg:hidden -mt-6 sm:-mt-8 relative z-20 pb-6">
          <Card className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-0">
            <SuccessContent onNavigate={onNavigate} />
          </Card>
        </div>

        {/* Laptop Content */}
        <div className="hidden lg:block h-full">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-8">You're all set to start using MessMaster</p>
            
            <SuccessContent onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface SuccessContentProps {
  onNavigate: (screen: AuthScreen) => void
}

// Extracted Success Content Component
function SuccessContent({ onNavigate }: SuccessContentProps) {
  return (
    <div className="space-y-6">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#48A6A7] to-[#3d8a8b] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Aboard!</h2>
        <p className="text-gray-600">Your account has been successfully created</p>
      </div>

      {/* Features List */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="bg-[#48A6A7]/10 p-3 rounded-xl">
            <UserPlus className="text-[#48A6A7]" size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Complete Your Profile</h4>
            <p className="text-gray-600 text-sm">Add your details and preferences</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="bg-[#48A6A7]/10 p-3 rounded-xl">
            <Utensils className="text-[#48A6A7]" size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Explore Meals</h4>
            <p className="text-gray-600 text-sm">Browse through our delicious menu</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="bg-[#48A6A7]/10 p-3 rounded-xl">
            <Bell className="text-[#48A6A7]" size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Stay Updated</h4>
            <p className="text-gray-600 text-sm">Get notified about meal schedules</p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={() => onNavigate("login")}
        className="w-full bg-gradient-to-r from-[#48A6A7] to-[#3d8a8b] hover:from-[#3d8a8b] hover:to-[#48A6A7] text-white rounded-xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Continue to Login
      </Button>
    </div>
  )
}
