'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Lock, User, ArrowRight, Loader2, Image, Smile, Mail } from "lucide-react";
import { useRouter } from 'next/navigation';

// Define UserData interface for TypeScript type checking
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profile: string;
  id: string;
}

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    profile: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
        setFormData(prev => ({ ...prev, profile: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare the form data according to API requirements
      const apiData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        phoneNumber: '', // Send empty value as specified
        profile: '', // Send empty value as specified
        password: formData.password
      };
      
      // Make the API request using axios
      const response = await axios.post(
        'https://mindora-backend-beta-version-m0bk.onrender.com/api/auth/register', 
        apiData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      // Registration successful
      console.log('User registered successfully:', response.data);
      
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
              firstName: payload.firstName || formData.firstName,
              lastName: payload.lastName || formData.lastName,
              email: payload.email || formData.email,
              username: payload.username || formData.username,
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
      
      // Fetch user profile data
      await fetchUserProfile(response.data.token);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      // Handle axios error
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to register user');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to fetch additional user profile data
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
      <nav className="border-b bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
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
              Join Mindora
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Begin your journey to mindful productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex justify-center">
                <label className="group relative cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors">
                    {profilePreview ? (
                      <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <Image className="w-8 h-8 text-purple-400 group-hover:text-purple-500 mb-1" />
                        <span className="text-xs text-purple-500">Add Photo</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <User className="w-4 h-4" /> First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <User className="w-4 h-4" /> Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field - Added as required by API */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <Smile className="w-4 h-4" /> Username
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">@</span>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-7"
                    placeholder="johndoe42"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <Lock className="w-4 h-4" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      formData.password.length >= 8 ? 'bg-green-500' : 
                      formData.password.length >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${Math.min(formData.password.length * 12.5, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  {formData.password.length >= 8 ? 'Strong password!' : 'Must be at least 8 characters'}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Your Space...
                  </>
                ) : (
                  <>
                    Start Mindful Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Already part of the community?{' '}
              <a 
                href="/login" 
                className="font-medium bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent hover:underline"
              >
                Sign in here
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;