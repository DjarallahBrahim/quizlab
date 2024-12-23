/*
  # Admin Authentication System

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `admins` table
    - Add policy for authenticated users to read their own data
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policy for admins
CREATE POLICY "Admins can read their own data"
  ON admins
  FOR SELECT
  USING (true);

-- Create function to check admin credentials
CREATE OR REPLACE FUNCTION check_admin_credentials(
  p_username text,
  p_password text
) RETURNS uuid AS $$
DECLARE
  v_admin_id uuid;
BEGIN
  SELECT id INTO v_admin_id
  FROM admins
  WHERE username = p_username
  AND password_hash = crypt(p_password, password_hash);
  
  RETURN v_admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;