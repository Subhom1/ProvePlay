import React, { useState } from 'react';
import { History, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

export const GameHistory = ({ history, onViewFairness }) => {
  const [showAll, setShowAll] = useState(false);
  const displayHistory = showAll ? history : history.slice(0, 10);

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-primary" />
            <CardTitle>Game History</CardTitle>
          </div>
          <CardDescription>Your recent games will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No games played yet</p>
            <p className="text-sm text-muted-foreground mt-2">Place your first bet to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-primary" />
              <CardTitle>Game History</CardTitle>
            </div>
            <CardDescription>{history.length} games played</CardDescription>
          </div>
          {history.length > 10 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Show All <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {displayHistory.map((game) => (
              <div
                key={game.id}
                className="p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant={game.result === 'win' ? 'default' : 'destructive'}>
                      {game.result === 'win' ? 'WIN' : 'LOSS'}
                    </Badge>
                    <span className="font-semibold text-foreground">{game.gameType}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewFairness(game)}
                    className="text-primary hover:text-primary-glow"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Verify
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Bet</p>
                    <p className="font-semibold text-foreground">${game.betAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payout</p>
                    <p className="font-semibold text-foreground">${game.payout.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Profit</p>
                    <p className={`font-semibold ${game.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {game.profit >= 0 ? '+' : ''}${game.profit.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Outcome</p>
                    <p className="font-semibold text-foreground">{game.details.outcome}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {new Date(game.timestamp).toLocaleString()}
                    </span>
                    <span className="text-muted-foreground font-mono">
                      Seed: {game.seed.substring(0, 12)}...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GameHistory;