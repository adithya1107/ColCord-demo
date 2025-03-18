import React from 'react';
import { MapPin } from 'lucide-react';
import { sendPing } from '../lib/supabaseClient';

interface PingButtonProps {
  onSuccess?: () => void;
}

export const PingButton: React.FC<PingButtonProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);

  const handlePing = async () => {
    setIsLoading(true);
    try {
      await sendPing();
      onSuccess?.();
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    } catch (error) {
      console.error('Error sending ping:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handlePing}
        disabled={isLoading}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
        title="Send Ping"
      >
        <MapPin className={`w-6 h-6 ${isLoading ? 'animate-pulse' : ''}`} />
      </button>
      
      {showFeedback && (
        <div className="fixed bottom-24 right-8 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          Ping sent successfully!
        </div>
      )}
    </>
  );
};