import React from 'react';
import { Shield, Check, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

export const FairnessModal = ({ isOpen, onClose, game }) => {
  if (!game) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Provably Fair Verification</DialogTitle>
              <DialogDescription>Verify the fairness of this game result</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Game Details */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Game Type</p>
                <p className="font-semibold text-foreground">{game.gameType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Result</p>
                <Badge variant={game.result === 'win' ? 'default' : 'destructive'}>
                  {game.result === 'win' ? 'WIN' : 'LOSS'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Choice</p>
                <p className="font-semibold text-foreground">{game.details.choice}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Outcome</p>
                <p className="font-semibold text-foreground">{game.details.outcome}</p>
              </div>
            </div>
          </div>

          {/* Seed Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-foreground">Game Seed</h4>
              <Check className="w-4 h-4 text-success" />
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Server Seed</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(game.seed)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="font-mono text-xs bg-muted/50 p-3 rounded break-all text-foreground">
                {game.seed}
              </p>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Verification Process</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Game seed generated</p>
                  <p className="text-xs text-muted-foreground">A cryptographic hash was created before the game</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Result determined</p>
                  <p className="text-xs text-muted-foreground">The outcome was calculated using the seed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Verification available</p>
                  <p className="text-xs text-muted-foreground">You can verify the result matches the seed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Game played on {new Date(game.timestamp).toLocaleString()}
            </p>
          </div>

          <Button onClick={onClose} className="w-full" size="lg">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FairnessModal;