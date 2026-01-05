import React from 'react';
import { TrendingUp, Target, Trophy, Gamepad2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export const StatsCards = ({ balance, totalWagered, totalWon, gamesPlayed }) => {
  const winRate = gamesPlayed > 0 ? ((totalWon / totalWagered) * 100) : 0;
  const profit = totalWon - totalWagered;

  const stats = [
    {
      title: 'Total Wagered',
      value: `$${totalWagered.toFixed(2)}`,
      icon: Target,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Total Won',
      value: `$${totalWon.toFixed(2)}`,
      icon: Trophy,
      gradient: 'from-yellow-500/20 to-amber-500/20',
      iconBg: 'bg-accent/10',
      iconColor: 'text-accent'
    },
    {
      title: 'Net Profit',
      value: `${profit >= 0 ? '+' : ''}$${profit.toFixed(2)}`,
      icon: TrendingUp,
      gradient: profit >= 0 ? 'from-green-500/20 to-emerald-500/20' : 'from-red-500/20 to-rose-500/20',
      iconBg: profit >= 0 ? 'bg-success/10' : 'bg-destructive/10',
      iconColor: profit >= 0 ? 'text-success' : 'text-destructive'
    },
    {
      title: 'Games Played',
      value: gamesPlayed.toString(),
      icon: Gamepad2,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className={`card-hover border-primary/20 bg-gradient-to-br ${stat.gradient}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;