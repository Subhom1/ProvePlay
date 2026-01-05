import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ProvePlay</h1>
              <p className="text-xs text-muted-foreground">Provably Fair Gaming</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Verified</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;