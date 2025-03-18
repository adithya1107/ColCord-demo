import React from 'react';
import { supabase } from '../lib/supabaseClient';
import { MessageCircle, Repeat, Trash2, Clock, MapPin } from 'lucide-react';
import { sendPing } from '../lib/supabaseClient';

interface PingFeedProps {
  onUpdate?: () => void;
  isAdmin: boolean;
  onThreadSelect?: (threadId: string) => void;
  selectedThread?: string | null;
}

export const PingFeed: React.FC<PingFeedProps> = ({
  onUpdate,
  isAdmin,
  onThreadSelect,
  selectedThread
}) => {
  const [pings, setPings] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPings = async () => {
    const { data, error } = await supabase
      .from('pings')
      .select(`
        *,
        threads (
          id
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching pings:', error);
    } else {
      setPings(data || []);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPings();

    const channel = supabase
      .channel('public:pings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pings' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPings((current) => [payload.new, ...current]);
          } else if (payload.eventType === 'DELETE') {
            setPings((current) => current.filter(ping => ping.id !== payload.old.id));
          }
          onUpdate?.();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onUpdate]);

  const handleReping = async (pingId: string) => {
    try {
      await sendPing(pingId);
      onUpdate?.();
    } catch (error) {
      console.error('Error repinging:', error);
    }
  };

  const startThread = async (pingId: string) => {
    try {
      const { data, error } = await supabase
        .from('threads')
        .insert({
          ping_id: pingId,
        })
        .select()
        .single();

      if (error) throw error;
      onThreadSelect?.(data.id);
      onUpdate?.();
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  const deletePing = async (pingId: string) => {
    try {
      await supabase.from('pings').delete().eq('id', pingId);
      onUpdate?.();
    } catch (error) {
      console.error('Error deleting ping:', error);
    }
  };

  const handleThreadClick = async (pingId: string) => {
    const ping = pings.find(p => p.id === pingId);
    if (ping?.threads?.[0]) {
      onThreadSelect?.(ping.threads[0].id);
    } else {
      await startThread(pingId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isAdmin && <h2 className="text-xl font-semibold text-gray-300 mb-4">Live Ping Feed</h2>}
      <div className="space-y-4">
        {pings.map((ping) => (
          <div
            key={ping.id}
            className={`bg-gray-800 rounded-lg shadow-md border ${
              ping.threads?.[0]?.id === selectedThread
                ? 'border-blue-500'
                : 'border-gray-700'
            } ${!isAdmin && 'cursor-pointer hover:border-blue-400'}`}
            onClick={!isAdmin ? () => handleThreadClick(ping.id) : undefined}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-mono text-gray-400">
                    {ping.id.slice(0, 8)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(ping.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              {ping.original_ping_id && (
                <div className="mb-3 text-sm text-gray-500">
                  Re-ping of: {ping.original_ping_id.slice(0, 8)}
                </div>
              )}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Position: {JSON.stringify(ping.position)}
                </div>
                {isAdmin ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startThread(ping.id)}
                      className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-full transition-colors"
                      title="Start Thread"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReping(ping.id)}
                      className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded-full transition-colors"
                      title="Re-ping"
                    >
                      <Repeat className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deletePing(ping.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-full transition-colors"
                      title="Delete Ping"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">
                      {ping.threads?.length ? 'View thread' : 'Start thread'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {pings.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No pings yet. Use the button in the bottom right to create one.
          </div>
        )}
      </div>
    </div>
  );
};