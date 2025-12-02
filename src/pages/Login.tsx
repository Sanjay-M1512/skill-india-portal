import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to the Awarding Body Portal",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Strip */}
      <div className="w-full bg-primary py-2">
        <div className="container mx-auto px-4">
          <p className="text-primary-foreground text-center text-sm font-medium">
            Government of India | Ministry of Skill Development & Entrepreneurship
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="space-y-6 pb-4">
            {/* Logos Section */}
            <div className="flex items-center justify-center gap-6">
              {/* India Emblem */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 text-secondary">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="50" cy="25" r="6" fill="currentColor"/>
                    <rect x="47" y="32" width="6" height="35" fill="currentColor"/>
                    <circle cx="50" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <line x1="30" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              
              {/* Skill India Logo */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 text-primary">
                    <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
                    <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="24" fontWeight="bold">SI</text>
                  </svg>
                </div>
              </div>
              
              {/* NCVET Logo */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 text-success">
                    <rect x="15" y="20" width="70" height="60" rx="5" fill="none" stroke="currentColor" strokeWidth="3"/>
                    <text x="50" y="58" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="bold">NCVET</text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Awarding Body Portal
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to manage certificate approvals
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Demo credentials: ab@portal.com / Abc@123
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="w-full bg-secondary py-3">
        <div className="container mx-auto px-4">
          <p className="text-secondary-foreground text-center text-xs">
            © 2025 National Council for Vocational Education and Training | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
