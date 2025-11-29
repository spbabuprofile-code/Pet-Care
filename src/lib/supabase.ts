import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      pets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'dog' | 'cat' | 'puppy' | 'kitten';
          breed: string | null;
          gender: 'male' | 'female' | null;
          date_of_birth: string | null;
          photo_url: string | null;
          medical_history: string;
          allergies: string;
          weight: number | null;
          created_at: string;
          updated_at: string;
        };
      };
      clinics: {
        Row: {
          id: string;
          name: string;
          city: string;
          address: string;
          pincode: string;
          latitude: number | null;
          longitude: number | null;
          phone: string;
          email: string | null;
          operating_hours: Record<string, any>;
          services_available: string[];
          is_24x7: boolean;
          amenities: string[];
          images: string[];
          description: string;
          created_at: string;
        };
      };
      doctors: {
        Row: {
          id: string;
          clinic_id: string;
          name: string;
          specialization: string;
          qualification: string;
          experience_years: number;
          photo_url: string | null;
          bio: string;
          available_days: string[];
          consultation_fee: number;
          created_at: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          user_id: string;
          pet_id: string;
          clinic_id: string;
          doctor_id: string | null;
          service_type: string;
          appointment_date: string;
          appointment_time: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes: string;
          total_amount: number;
          created_at: string;
          updated_at: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          brand: string;
          category: string;
          description: string;
          price: number;
          stock_quantity: number;
          images: string[];
          pet_type: 'dog' | 'cat' | 'both' | null;
          life_stage: 'puppy' | 'adult' | 'senior' | 'all' | null;
          weight_options: any[];
          ingredients: string;
          nutritional_info: Record<string, any>;
          is_featured: boolean;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          total_amount: number;
          delivery_address: Record<string, any>;
          delivery_slot: string | null;
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
          payment_method: string | null;
          order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          entity_type: 'clinic' | 'doctor' | 'product';
          entity_id: string;
          rating: number;
          review_text: string;
          photos: string[];
          is_verified: boolean;
          helpful_count: number;
          created_at: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image: string | null;
          category: string;
          tags: string[];
          author: string;
          reading_time: number;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
