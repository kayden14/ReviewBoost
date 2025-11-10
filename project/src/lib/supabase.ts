// ./supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Load Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
