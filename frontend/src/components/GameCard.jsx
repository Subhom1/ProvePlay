import React, { useState } from 'react';
import { Coins, Dices, Play, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner';
import { generateGameSeed, verifyGameResult } from '../utils/fairness';

export const GameCard = ({ gameType, balance, onGameResult }) => {
  const [betAmount, setBetAmount] = useState('');
  const [choice, setChoice] = useState(gameType === 'coinflip' ? 'heads' : '4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [animating, setAnimating] = useState(false);

  const gameConfig = {
    coinflip: {
      title: 'Coin Flip',
      description: 'Double or nothing',
      icon: Coins,
      multiplier: 2,
      choices: [
        { value: 'heads', label: 'Heads' },
        { value: 'tails', label: 'Tails' }
      ]
    },
    dice: {
      title: 'Dice Roll',
      description: 'Guess the number',
      icon: Dices,
      multiplier: 6,
      choices: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' }
      ]
    }
  };

  const config = gameConfig[gameType];
  const Icon = config.icon;

  const playGame = async () => {
    const bet = parseFloat(betAmount);
    
    if (isNaN(bet) || bet <= 0) {
      toast.error('Please enter a valid bet amount');
      return;
    }
    
    if (bet > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsPlaying(true);
    setAnimating(true);

    // Generate seed for fairness
    const seed = generateGameSeed();
    
    // Simulate game delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate result
    const gameResult = gameType === 'coinflip' 
      ? verifyGameResult(seed, ['heads', 'tails'])
      : verifyGameResult(seed, ['1', '2', '3', '4', '5', '6']);

    const won = gameResult === choice;
    const payout = won ? bet * config.multiplier : 0;
    const profit = payout - bet;

    const result = {
      betAmount: bet,
      result: won ? 'win' : 'loss',
      payout,
      gameType: config.title,
      details: {
        choice,
        outcome: gameResult,
        multiplier: config.multiplier
      },
      seed,
      timestamp: new Date().toISOString()
    };

    setLastResult(result);
    onGameResult(result);

    if (won) {
      toast.success(`🎉 You won $${payout.toFixed(2)}!`, {
        description: `Outcome: ${gameResult}`
      });
    } else {
      toast.error(`You lost $${bet.toFixed(2)}`, {
        description: `Outcome: ${gameResult}`
      });
    }

    setAnimating(false);
    setIsPlaying(false);
    setBetAmount('');
  };

  return (
    <Card className="card-hover border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow ${animating ? (gameType === 'coinflip' ? 'flip-coin' : 'roll-dice') : ''}`}>
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">{config.title}</CardTitle>
              <CardDescription>{config.description} • {config.multiplier}x payout</CardDescription>
            </div>
          </div>
          {lastResult && (
            <div className={`px-4 py-2 rounded-lg font-semibold ${lastResult.result === 'win' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
              {lastResult.result === 'win' ? `+$${lastResult.payout.toFixed(2)}` : `-$${lastResult.betAmount.toFixed(2)}`}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bet Amount */}
        <div className="space-y-2">
          <Label htmlFor={`bet-${gameType}`}>Bet Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id={`bet-${gameType}`}
              type="number"
              placeholder="Enter bet amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              disabled={isPlaying}
              className="pl-9"
              step="0.01"
              min="0"
              max={balance}
            />
          </div>
          <p className="text-xs text-muted-foreground">Max bet: ${balance.toFixed(2)}</p>
        </div>

        {/* Choice Selection */}
        <div className="space-y-2">
          <Label>Your Choice</Label>
          <RadioGroup value={choice} onValueChange={setChoice} disabled={isPlaying}>
            <div className="grid grid-cols-3 gap-3">
              {config.choices.map((option) => (
                <div key={option.value} className="relative">
                  <RadioGroupItem
                    value={option.value}
                    id={`${gameType}-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`${gameType}-${option.value}`}
                    className="flex items-center justify-center px-4 py-3 rounded-lg border-2 border-border bg-card cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary font-semibold"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Play Button */}
        <Button
          onClick={playGame}
          disabled={isPlaying}
          className="w-full bg-gradient-primary hover:opacity-90 shadow-glow"
          size="lg"
        >
          {isPlaying ? (
            <>
              <span className="animate-pulse">Playing...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Play Game
            </>
          )}
        </Button>

        {/* Last Result Display */}
        {lastResult && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Outcome:</span>
              <span className="font-bold text-foreground">{lastResult.details.outcome}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Your Choice:</span>
              <span className="font-bold text-foreground">{lastResult.details.choice}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameCard;