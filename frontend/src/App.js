import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import WalletCard from './components/WalletCard';
import GameCard from './components/GameCard';
import GameHistory from './components/GameHistory';
import StatsCards from './components/StatsCards';
import FairnessModal from './components/FairnessModal';

function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('balance');
    return saved ? parseFloat(saved) : 1000.00;
  });

  const [gameHistory, setGameHistory] = useState(() => {
    const saved = localStorage.getItem('gameHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [totalWagered, setTotalWagered] = useState(() => {
    const saved = localStorage.getItem('totalWagered');
    return saved ? parseFloat(saved) : 0;
  });

  const [totalWon, setTotalWon] = useState(() => {
    const saved = localStorage.getItem('totalWon');
    return saved ? parseFloat(saved) : 0;
  });

  const [showFairnessModal, setShowFairnessModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  useEffect(() => {
    localStorage.setItem('totalWagered', totalWagered.toString());
  }, [totalWagered]);

  useEffect(() => {
    localStorage.setItem('totalWon', totalWon.toString());
  }, [totalWon]);

  const handleDeposit = (amount) => {
    setBalance(prev => prev + amount);
  };

  const handleWithdraw = (amount) => {
    if (amount <= balance) {
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  const handleGameResult = (gameData) => {
    const { betAmount, result, payout, gameType, details, seed, timestamp } = gameData;
    
    // Update balance
    setBalance(prev => prev + payout - betAmount);
    
    // Update statistics
    setTotalWagered(prev => prev + betAmount);
    if (payout > 0) {
      setTotalWon(prev => prev + payout);
    }
    
    // Add to history
    const historyEntry = {
      id: Date.now(),
      timestamp: timestamp || new Date().toISOString(),
      gameType,
      betAmount,
      result,
      payout,
      profit: payout - betAmount,
      details,
      seed
    };
    
    setGameHistory(prev => [historyEntry, ...prev].slice(0, 50)); // Keep last 50 games
  };

  const handleViewFairness = (game) => {
    setSelectedGame(game);
    setShowFairnessModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            ProvePlay Casino
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience provably fair gaming with transparent results and instant payouts
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards 
          balance={balance}
          totalWagered={totalWagered}
          totalWon={totalWon}
          gamesPlayed={gameHistory.length}
        />

        {/* Main Gaming Area */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Wallet Section */}
          <div className="lg:col-span-1">
            <WalletCard 
              balance={balance}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />
          </div>

          {/* Games Section */}
          <div className="lg:col-span-2 space-y-6">
            <GameCard 
              gameType="coinflip"
              balance={balance}
              onGameResult={handleGameResult}
            />
            
            <GameCard 
              gameType="dice"
              balance={balance}
              onGameResult={handleGameResult}
            />
          </div>
        </div>

        {/* Game History */}
        <GameHistory 
          history={gameHistory}
          onViewFairness={handleViewFairness}
        />
      </main>

      {/* Fairness Modal */}
      <FairnessModal 
        isOpen={showFairnessModal}
        onClose={() => setShowFairnessModal(false)}
        game={selectedGame}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;