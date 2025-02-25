'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Mail, Lock, Loader2, Orbit, Leaf, Waves, AlertCircle } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define interface for user data
interface UserData {
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  profile?: string;
  id?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Make the login API request using axios
      const response = await axios.post(
        'https://mindora-backend-beta-version-m0bk.onrender.com/api/auth/login', 
        {
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      // Login successful
      console.log('User logged in successfully:', response.data);
      
      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('mindora_token', response.data.token);
        
        // Extract and store user data from token
        try {
          const tokenParts = response.data.token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            
            // Create user data object
            const userData: UserData = {
              firstName: payload.firstName || '',
              lastName: payload.lastName || '',
              email: payload.email || formData.email,
              username: payload.username || '',
              profile: payload.profile || '',
              id: payload.id || payload.sub || ''
            };
            
            // Store user data in localStorage
            localStorage.setItem('mindora_user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Error parsing token:', error);
        }
        
        // Also store the entire user object if it exists in response
        if (response.data.user) {
          localStorage.setItem('mindora_user', JSON.stringify(response.data.user));
        }
      }
      
      // Fetch user profile data if needed
      await fetchUserProfile(response.data.token);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      // Handle axios error
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Invalid email or password');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to fetch additional user profile data if needed
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get(
        'https://mindora-backend-beta-version-m0bk.onrender.com/api/users/profile', 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data) {
        // Store complete user profile data
        localStorage.setItem('mindora_user_profile', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Continue even if profile fetch fails
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      {/* Animated background elements */}
      <div className="absolute top-20 left-0 w-full h-full opacity-10 dark:opacity-5">
        <Leaf className="absolute top-1/4 left-10 animate-float w-24 h-24 text-purple-200" />
        <Orbit className="absolute top-1/3 right-20 animate-spin-slow w-32 h-32 text-blue-200" />
        <Waves className="absolute bottom-20 left-1/4 animate-pulse w-28 h-28 text-pink-200" />
      </div>

      <nav className="border-b bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Mindora
            </span>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Re-enter your mindful space
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <Lock className="w-4 h-4" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-end">
                <Link 
                  href="/forgot-password" 
                  className="text-sm bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accessing Your Space...
                  </>
                ) : 'Continue Mindful Journey'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              New to Mindora?{' '}
              <Link 
                href="/signup" 
                className="font-medium bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent hover:underline"
              >
                Create account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;