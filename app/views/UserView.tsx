import React from 'react';
import { PingButton } from '../components/PingButton';
import { PingFeed } from '../components/PingFeed';
import { MessageSquare } from 'lucide-react';
import { ThreadView } from '../components/ThreadView';

export const UserView = () => {
  const [selectedThread, setSelectedThread] = React.useState<string | null>(null);

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <MessageSquare className="w-7 h-7 text-purple-400" />
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">Campus Feed</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-900/20 p-6 shadow-xl shadow-purple-900/5">
            <PingFeed 
              isAdmin={false}
              onThreadSelect={setSelectedThread}
              selectedThread={selectedThread}
            />
          </div>
        </div>
        <div className="lg:border-l lg:border-purple-900/20 lg:pl-6">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-900/20 p-6 h-full shadow-xl shadow-purple-900/5">
            {selectedThread ? (
              <ThreadView threadId={selectedThread} onClose={() => setSelectedThread(null)} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <MessageSquare className="w-12 h-12 mb-4 text-purple-500/50" />
                <p className="text-lg font-medium mb-2">No Thread Selected</p>
                <p className="text-sm text-gray-500">
                  Select a ping from the feed to view or start a conversation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <PingButton />
    </main>
  );
};