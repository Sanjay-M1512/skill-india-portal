import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Government Emblem */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-8 h-8 text-primary">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3"/>
                  <circle cx="50" cy="30" r="8" fill="currentColor"/>
                  <path d="M30 50 L70 50 M50 35 L50 70 M35 55 L65 55 M40 60 L60 60 M45 65 L55 65" 
                        stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-heading font-bold text-foreground">
                  Awarding Body Portal
                </h1>
                <p className="text-xs text-muted-foreground">
                  Ministry of Skill Development & Entrepreneurship
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
