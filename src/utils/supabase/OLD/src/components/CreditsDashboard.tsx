import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  ArrowLeft,
  CreditCard,
  Zap
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../utils/supabase/client';
import { VERCEL_API_BASE, API_ENDPOINTS } from '../utils/config';

// ============================================
// TYPES
// ============================================

interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'credit' | 'debit' | 'refund';
  description: string;
  created_at: string;
}

interface CreditStats {
  total_credits: number;
  credits_used_today: number;
  credits_used_this_week: number;
  credits_used_this_month: number;
  total_generations: number;
}

// ============================================
// COMPONENT
// ============================================

export function CreditsDashboard({ onBack }: { onBack: () => void }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [stats, setStats] = useState<CreditStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ============================================
  // GET USER ID
  // ============================================

  useEffect(() => {
    const getUserId = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    getUserId();
  }, []);

  // ============================================
  // FETCH CREDITS
  // ============================================

  const fetchCredits = async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/credits?user_id=${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        console.error('Failed to fetch credits:', response.status);
        return;
      }

      const data = await response.json();
      setCredits(data.credits ?? 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  // ============================================
  // FETCH TRANSACTIONS
  // ============================================

  const fetchTransactions = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('credit_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setTransactions(data || []);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // CALCULATE STATS
  // ============================================

  const calculateStats = () => {
    if (!transactions.length) return;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const debits = transactions.filter(t => t.type === 'debit');

    const todayDebits = debits.filter(
      t => new Date(t.created_at) >= today
    );

    const weekDebits = debits.filter(
      t => new Date(t.created_at) >= weekAgo
    );

    const monthDebits = debits.filter(
      t => new Date(t.created_at) >= monthAgo
    );

    setStats({
      total_credits: credits ?? 0,
      credits_used_today: Math.abs(todayDebits.reduce((sum, t) => sum + t.amount, 0)),
      credits_used_this_week: Math.abs(weekDebits.reduce((sum, t) => sum + t.amount, 0)),
      credits_used_this_month: Math.abs(monthDebits.reduce((sum, t) => sum + t.amount, 0)),
      total_generations: debits.length
    });
  };

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {
    if (userId) {
      fetchCredits();
      fetchTransactions();
    }
  }, [userId]);

  useEffect(() => {
    if (transactions.length > 0 && credits !== null) {
      calculateStats();
    }
  }, [transactions, credits]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchCredits(), fetchTransactions()]);
    setIsRefreshing(false);
    toast.success('Data refreshed');
  };

  const exportCSV = () => {
    if (!transactions.length) {
      toast.error('No transactions to export');
      return;
    }

    const headers = ['Date', 'Type', 'Amount', 'Description'];
    const rows = transactions.map(t => [
      new Date(t.created_at).toLocaleString(),
      t.type,
      t.amount,
      t.description
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credits-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast.success('CSV exported');
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-purple-500/30 hover:bg-purple-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Coins className="w-8 h-8 text-yellow-400" />
              Credits Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="border-purple-500/30 hover:bg-purple-500/10"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            <Button
              onClick={exportCSV}
              variant="outline"
              size="sm"
              className="border-green-500/30 hover:bg-green-500/10"
              disabled={!transactions.length}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Current Credits */}
          <Card className="bg-[#141726] border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Current Credits</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {credits !== null ? credits : '...'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-yellow-400" />
              </div>
            </div>

            <Button
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={() => window.open('https://photoglow.ai/pricing', '_blank')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Buy Credits
            </Button>
          </Card>

          {/* Used Today */}
          <Card className="bg-[#141726] border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Used Today</p>
                <p className="text-3xl font-bold">
                  {stats?.credits_used_today ?? 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Since midnight</p>
          </Card>

          {/* Used This Week */}
          <Card className="bg-[#141726] border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Used This Week</p>
                <p className="text-3xl font-bold">
                  {stats?.credits_used_this_week ?? 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
          </Card>

          {/* Total Generations */}
          <Card className="bg-[#141726] border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Generations</p>
                <p className="text-3xl font-bold">
                  {stats?.total_generations ?? 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">All time</p>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="bg-[#141726] border-purple-500/20 p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

          {isLoading ? (
            <div className="text-center py-12 text-gray-500">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" />
              <p>Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Coins className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No transactions yet</p>
              <p className="text-xs mt-1">Start generating images to see your history</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20 text-left">
                    <th className="py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-400">Type</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-400">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-300">
                        {new Date(transaction.created_at).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <Badge
                          className={
                            transaction.type === 'credit'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : transaction.type === 'debit'
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }
                        >
                          {transaction.type === 'credit' ? (
                            <>
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Credit
                            </>
                          ) : transaction.type === 'debit' ? (
                            <>
                              <TrendingDown className="w-3 h-3 mr-1" />
                              Debit
                            </>
                          ) : (
                            'Refund'
                          )}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={
                            transaction.amount > 0
                              ? 'text-green-400 font-semibold'
                              : 'text-red-400 font-semibold'
                          }
                        >
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {transaction.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Usage Insights */}
        <Card className="bg-[#141726] border-purple-500/20 p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0E0F14] rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Daily Average</p>
              <p className="text-2xl font-bold">
                {stats ? Math.round(stats.credits_used_this_month / 30) : 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">credits/day</p>
            </div>

            <div className="bg-[#0E0F14] rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Weekly Average</p>
              <p className="text-2xl font-bold">
                {stats ? Math.round(stats.credits_used_this_month / 4) : 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">credits/week</p>
            </div>

            <div className="bg-[#0E0F14] rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Projected Monthly</p>
              <p className="text-2xl font-bold">
                {stats ? Math.round((stats.credits_used_today * 30)) : 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">based on today</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
