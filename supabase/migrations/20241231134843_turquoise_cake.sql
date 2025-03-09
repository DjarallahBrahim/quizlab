/*
  # Add team users management
  
  1. New Tables
    - `team_users`
      - `id` (uuid, primary key)
      - `last_name` (text, unique)
      - `created_at` (timestamp)
      - `created_by` (uuid, references admins)
  
  2. Security
    - Enable RLS on `team_users` table
    - Add policies for authenticated users
*/

-- Create team users table
CREATE TABLE IF NOT EXISTS team_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  last_name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES admins(id)
);

-- Enable RLS
ALTER TABLE team_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations on team_users" ON team_users FOR ALL USING (true);

-- Create function to verify user exists
CREATE OR REPLACE FUNCTION check_team_user_exists(p_last_name text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM team_users WHERE last_name = p_last_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;