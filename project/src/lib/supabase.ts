// ./supabaseClient.ts
// 
// IMPORTANT: If you encounter the error "Could not find the table 'public.profiles' in the schema cache",
// you need to run the database migration. The migration file is located at:
// supabase/migrations/20251109010534_create_reviewboost_schema.sql
//
// To apply the migration:
// 1. Go to your Supabase Dashboard > SQL Editor
// 2. Copy and paste the contents of the migration file
// 3. Run the SQL script
//
// Or use Supabase CLI: supabase db push
//
import { createClient } from '@supabase/supabase-js';

// Load Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// User roles
export type UserType = 'freelancer' | 'admin';

// Profile interface
export interface Profile {
  id: string;
  user_type: UserType;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Freelancer-specific profile interface
export interface FreelancerProfile {
  id: string;
  user_id: string;
  skills: string[];
  portfolio_url?: string;
  credentials_url?: string;
  preferences: Record<string, unknown>;
  status: 'onboarded' | 'matched' | 'reviewed' | 'rejected';
  vetting_notes?: string;
  created_at: string;
  updated_at: string;
}

// Review requests interface
export interface ReviewRequest {
  id: string;
  freelancer_id: string;
  review_description: string;
  payment_amount: number;
  platforms: string[];
  additional_info?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  payment_status: 'pending' | 'completed' | 'refunded';
  payment_id?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

// Contact submissions interface
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  message_type: 'support' | 'general' | 'partnership' | 'other';
  message: string;
  status?: string;
  created_at?: string;
}

// Resource interface
export interface Resource {
  id: string;
  title: string;
  description: string;
  resource_type: 'course' | 'mentorship' | 'template' | 'article';
  url: string;
  skill_category: string;
  created_at: string;
}
