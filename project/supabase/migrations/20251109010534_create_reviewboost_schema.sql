/*
  # ReviewBoost Database Schema

  ## Overview
  Complete database schema for ReviewBoost platform enabling freelancers to earn verified reviews
  through a vetting and matching process with admin approval.

  ## New Tables

  ### 1. `profiles`
  Stores extended user profile information for both freelancers and admins
  - `id` (uuid, FK to auth.users) - User identifier
  - `user_type` (text) - Role: 'freelancer' or 'admin'
  - `full_name` (text) - User's full name
  - `email` (text) - Contact email
  - `phone` (text, optional) - Contact phone
  - `avatar_url` (text, optional) - Profile picture URL
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `freelancer_profiles`
  Extended freelancer-specific information for vetting and matching
  - `id` (uuid, PK) - Profile identifier
  - `user_id` (uuid, FK) - Reference to profiles
  - `skills` (text[]) - Array of freelancer skills
  - `portfolio_url` (text, optional) - Portfolio link
  - `credentials_url` (text, optional) - Uploaded credentials document
  - `preferences` (jsonb) - Preferences for matching
  - `status` (text) - Workflow status: 'onboarded', 'matched', 'reviewed', 'rejected'
  - `vetting_notes` (text, optional) - Admin notes from vetting process
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `review_requests`
  Tracks review requests submitted by freelancers
  - `id` (uuid, PK) - Request identifier
  - `freelancer_id` (uuid, FK) - Reference to freelancer_profiles
  - `review_description` (text) - Freelancer's explanation of review needs
  - `payment_amount` (numeric) - Amount willing to pay
  - `platforms` (text[]) - Target platforms (Upwork, Fiverr, etc.)
  - `additional_info` (text, optional) - Special requests or notes
  - `status` (text) - Request status: 'pending', 'approved', 'rejected', 'completed'
  - `payment_status` (text) - Payment status: 'pending', 'completed', 'refunded'
  - `payment_id` (text, optional) - External payment processor ID
  - `admin_notes` (text, optional) - Admin feedback on request
  - `created_at` (timestamptz) - Request submission timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `completed_at` (timestamptz, optional) - Review completion timestamp

  ### 4. `contact_submissions`
  Stores contact form submissions
  - `id` (uuid, PK) - Submission identifier
  - `name` (text) - Submitter name
  - `email` (text) - Contact email
  - `message_type` (text) - Type: 'support', 'general', 'partnership', 'other'
  - `message` (text) - Message content
  - `status` (text) - Status: 'new', 'in_progress', 'resolved'
  - `created_at` (timestamptz) - Submission timestamp

  ### 5. `chat_messages`
  Stores chat overlay messages
  - `id` (uuid, PK) - Message identifier
  - `user_id` (uuid, FK, optional) - User sending message (null for guests)
  - `message` (text) - Message content
  - `sender_type` (text) - 'user' or 'admin'
  - `session_id` (text) - Chat session identifier
  - `created_at` (timestamptz) - Message timestamp

  ### 6. `resources`
  Educational resources for freelancers who need improvement
  - `id` (uuid, PK) - Resource identifier
  - `title` (text) - Resource title
  - `description` (text) - Resource description
  - `resource_type` (text) - Type: 'course', 'mentorship', 'template', 'article'
  - `url` (text) - Resource link
  - `skill_category` (text) - Related skill category
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - RLS enabled on all tables
  - Policies restrict access based on user_type and ownership
  - Admins have elevated permissions for vetting and management
  - Public can submit contact forms
  - Chat messages restricted to session participants

  ## Important Notes
  1. All tables use UUIDs for primary keys
  2. Timestamps include timezone information
  3. Status fields use predefined text values for consistency
  4. JSONB used for flexible preference storage
  5. Arrays used for multi-value fields (skills, platforms)
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type text NOT NULL DEFAULT 'freelancer',
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_user_type CHECK (user_type IN ('freelancer', 'admin'))
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create freelancer_profiles table
CREATE TABLE IF NOT EXISTS freelancer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skills text[] DEFAULT '{}',
  portfolio_url text,
  credentials_url text,
  preferences jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'onboarded',
  vetting_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('onboarded', 'matched', 'reviewed', 'rejected'))
);

ALTER TABLE freelancer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can view own profile"
  ON freelancer_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Freelancers can update own profile"
  ON freelancer_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Freelancers can insert own profile"
  ON freelancer_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all freelancer profiles"
  ON freelancer_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can update freelancer profiles"
  ON freelancer_profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

-- Create review_requests table
CREATE TABLE IF NOT EXISTS review_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id uuid NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,
  review_description text NOT NULL,
  payment_amount numeric NOT NULL,
  platforms text[] NOT NULL DEFAULT '{}',
  additional_info text,
  status text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'pending',
  payment_id text,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'completed', 'refunded')),
  CONSTRAINT positive_amount CHECK (payment_amount > 0)
);

ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can view own review requests"
  ON review_requests FOR SELECT
  TO authenticated
  USING (
    freelancer_id IN (
      SELECT id FROM freelancer_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can create review requests"
  ON review_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    freelancer_id IN (
      SELECT id FROM freelancer_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all review requests"
  ON review_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can update review requests"
  ON review_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message_type text NOT NULL DEFAULT 'general',
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_message_type CHECK (message_type IN ('support', 'general', 'partnership', 'other')),
  CONSTRAINT valid_status CHECK (status IN ('new', 'in_progress', 'resolved'))
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact submission"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  message text NOT NULL,
  sender_type text NOT NULL,
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_sender_type CHECK (sender_type IN ('user', 'admin'))
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create chat messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all chat messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can create chat messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  resource_type text NOT NULL,
  url text NOT NULL,
  skill_category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_resource_type CHECK (resource_type IN ('course', 'mentorship', 'template', 'article'))
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view resources"
  ON resources FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage resources"
  ON resources FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_user_id ON freelancer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_status ON freelancer_profiles(status);
CREATE INDEX IF NOT EXISTS idx_review_requests_freelancer_id ON review_requests(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_review_requests_status ON review_requests(status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_freelancer_profiles_updated_at
  BEFORE UPDATE ON freelancer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_review_requests_updated_at
  BEFORE UPDATE ON review_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();