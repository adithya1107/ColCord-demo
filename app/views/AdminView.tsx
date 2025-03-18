import React from 'react';
import { PingButton } from '../components/PingButton';
import { PingFeed } from '../components/PingFeed';
import { getStats } from '../lib/supabase';
import { Zap, MessageSquare, Users } from 'lucide-react';

export const AdminView = () => {
  const [stats, setStats] = React.useState({
    activePings: 0,
    activeThreads: 0,
    totalMessages: 0
  });

  const updateStats = async () => {
    try {
      const newStats = await getStats();
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  React.useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={<Zap className="w-6 h-6" />}
            title="Active Pings"
            value={stats.activePings}
            color="purple"
          />
          <StatsCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Active Threads"
            value={stats.activeThreads}
            color="pink"
          />
          <StatsCard
            icon={<Users className="w-6 h-6" />}
            title="Total Messages"
            value={stats.totalMessages}
            color="indigo"
          />
        </div>
      </div>
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-900/20 p-6 shadow-xl shadow-purple-900/5">
        <PingFeed onUpdate={updateStats} isAdmin={true} />
      </div>
      <PingButton onSuccess={updateStats} />
    </main>
  );
};

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: 'purple' | 'pink' | 'indigo';
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, color }) => {
  const colorClasses = {
    purple: 'from-purple-500/10 to-purple-600/10 text-purple-400 border-purple-500/20',
    pink: 'from-pink-500/10 to-pink-600/10 text-pink-400 border-pink-500/20',
    indigo: 'from-indigo-500/10 to-indigo-600/10 text-indigo-400 border-indigo-500/20'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl border p-6 backdrop-blur-sm shadow-xl`}>
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};