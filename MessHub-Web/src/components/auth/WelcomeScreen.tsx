"use client"

import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { ChefHat, Sparkles, Star, Utensils, Store, Users, ArrowRight, User } from "lucide-react"
import type { AuthScreen } from "../../types/auth"

interface WelcomeScreenProps {
  onNavigate: (screen: AuthScreen, state?: any) => void
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
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
            <p className="text-xl text-white/80 max-w-md">Your one-stop solution for mess management</p>
            
            {/* Features for Laptop */}
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md">
                <h3 className="text-white text-xl font-semibold mb-4">Platform Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Store size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Mess Management</h4>
                      <p className="text-white/80 text-sm">Efficiently manage your mess business</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Utensils size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Meal Planning</h4>
                      <p className="text-white/80 text-sm">Plan and schedule your meals easily</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Customer Management</h4>
                      <p className="text-white/80 text-sm">Handle customer relationships smoothly</p>
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
          <h1 className="text-white text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Welcome</h1>
          <p className="text-white/80 text-base sm:text-lg">Choose your account type to get started</p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 right-4 sm:top-20 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-lg"></div>
      </div>

      {/* Welcome Content - Adjusted for both mobile and laptop */}
      <div className="px-4 sm:px-6 lg:px-0 lg:ml-auto lg:w-1/2 lg:max-w-xl lg:py-12 lg:pr-12 relative">
        <div className="lg:hidden -mt-6 sm:-mt-8 relative z-20 pb-6">
          <Card className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-0">
            <WelcomeContent onNavigate={onNavigate} />
          </Card>
        </div>

        {/* Laptop Content */}
        <div className="hidden lg:block h-full">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Get Started</h2>
            <p className="text-gray-600 mb-8">Choose your account type to begin</p>
            
            <WelcomeContent onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface WelcomeContentProps {
  onNavigate: (screen: AuthScreen, state?: any) => void
}

// Extracted Welcome Content Component
function WelcomeContent({ onNavigate }: WelcomeContentProps) {
  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#48A6A7] to-[#3d8a8b] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ChefHat className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">MessMaster</h2>
        <p className="text-gray-600">Choose your role to get started</p>
      </div>

      {/* Role Selection */}
      <div className="space-y-4">
        <Button
          onClick={() => onNavigate("register", { role: "mess_owner" })}
          className="w-full bg-gradient-to-r from-[#48A6A7] to-[#3d8a8b] hover:from-[#3d8a8b] hover:to-[#48A6A7] text-white rounded-xl p-6 text-left group transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Store className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Mess Owner</h3>
              <p className="text-white/80 text-sm">Manage your mess business efficiently</p>
            </div>
            <ArrowRight className="ml-auto text-white/60 group-hover:text-white transition-colors duration-300" size={20} />
          </div>
        </Button>

        <Button
          onClick={() => onNavigate("register", { role: "customer" })}
          className="w-full bg-white hover:bg-gray-50 text-gray-800 rounded-xl p-6 text-left group border-2 border-gray-200 transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#48A6A7]/10 p-3 rounded-xl">
              <User className="text-[#48A6A7]" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Customer</h3>
              <p className="text-gray-600 text-sm">Find and order from nearby mess</p>
            </div>
            <ArrowRight className="ml-auto text-gray-400 group-hover:text-[#48A6A7] transition-colors duration-300" size={20} />
          </div>
        </Button>
      </div>

      {/* Sign In Option */}
      <div className="text-center pt-4">
        <p className="text-gray-600 mb-2">Already have an account?</p>
        <Button
          variant="ghost"
          onClick={() => onNavigate("login")}
          className="text-[#48A6A7] hover:text-[#3d8a8b] hover:bg-transparent font-semibold"
        >
          Sign In
        </Button>
      </div>
    </div>
  )
}
