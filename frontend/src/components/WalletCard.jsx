import React, { useState } from 'react';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

export const WalletCard = ({ balance, onDeposit, onWithdraw }) => {
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    onDeposit(value);
    toast.success(`Deposited $${value.toFixed(2)} successfully!`);
    setAmount('');
  };

  const handleWithdraw = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (value > balance) {
      toast.error('Insufficient balance');
      return;
    }
    const success = onWithdraw(value);
    if (success) {
      toast.success(`Withdrew $${value.toFixed(2)} successfully!`);
      setAmount('');
    }
  };

  const quickAmounts = [10, 50, 100, 500];

  return (
    <Card className="card-hover border-primary/20 bg-gradient-to-br from-card to-muted/30">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Wallet</CardTitle>
            <CardDescription>Manage your funds</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Balance Display */}
        <div className="p-6 rounded-xl bg-gradient-primary text-primary-foreground text-center shadow-glow">
          <p className="text-sm opacity-90 mb-1">Current Balance</p>
          <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
        </div>

        {/* Deposit/Withdraw Tabs */}
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit" className="flex items-center space-x-2">
              <ArrowDownToLine className="w-4 h-4" />
              <span>Deposit</span>
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="flex items-center space-x-2">
              <ArrowUpFromLine className="w-4 h-4" />
              <span>Withdraw</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  className="text-xs"
                >
                  ${amt}
                </Button>
              ))}
            </div>

            <Button 
              onClick={handleDeposit} 
              className="w-full bg-gradient-primary hover:opacity-90"
              size="lg"
            >
              Deposit Funds
            </Button>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9"
                  step="0.01"
                  min="0"
                  max={balance}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Available: ${balance.toFixed(2)}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.filter(amt => amt <= balance).map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  className="text-xs"
                >
                  ${amt}
                </Button>
              ))}
            </div>

            <Button 
              onClick={handleWithdraw} 
              className="w-full"
              variant="secondary"
              size="lg"
            >
              Withdraw Funds
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WalletCard;