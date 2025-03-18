export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string;
            role: 'student' | 'mentor' | 'admin';
            full_name: string;
            email: string;
            avatar_url: string | null;
            created_at: string;
            updated_at: string;
          };
        };
        mentor_profiles: {
          Row: {
            id: string;
            college: string;
            major: string;
            bio: string | null;
            experience_years: number;
            hourly_rate: number;
            is_verified: boolean;
            available_for_free: boolean;
            subjects: string[];
            availability: Record<string, any>;
            created_at: string;
            updated_at: string;
          };
        };
        sessions: {
          Row: {
            id: string;
            mentor_id: string;
            student_id: string;
            status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
            scheduled_at: string;
            duration_minutes: number;
            amount: number | null;
            payment_status: string | null;
            payment_id: string | null;
            notes: string | null;
            created_at: string;
            updated_at: string;
          };
        };
        reviews: {
          Row: {
            id: string;
            session_id: string;
            student_id: string;
            mentor_id: string;
            rating: number;
            comment: string | null;
            created_at: string;
          };
        };
        chat_messages: {
          Row: {
            id: string;
            session_id: string;
            sender_id: string;
            content: string;
            created_at: string;
          };
        };
      };
    };
  }