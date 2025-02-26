"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await axios.post(
        'https://mindora-backend-beta-version-m0bk.onrender.com/api/auth/forgot_password',
        { email }
      );
      setStatus('success');
      setMessage(response.data.message || 'A reset link has been sent to your email address.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatus('error');
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="bg-white/40 backdrop-blur-sm p-6">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4 text-slate-600">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full"
                placeholder="you@example.com"
              />
            </div>
            {message && (
              <div className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-white/40 backdrop-blur-sm p-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="flex items-center"
          >
            <ArrowLeft className="mr-2" /> Back to Login
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ForgetPasswordPage;
