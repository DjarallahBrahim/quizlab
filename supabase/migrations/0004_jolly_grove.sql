/*
  # Add default admin user

  1. Changes
    - Enable pgcrypto extension for password hashing
    - Add default admin user with credentials:
      username: admin
      password: admin2024

  2. Security
    - Password is stored as a secure hash using pgcrypto
*/

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert default admin user with hashed password
INSERT INTO admins (username, password_hash)
VALUES (
  'admin',
  crypt('admin2024', gen_salt('bf'))
)
ON CONFLICT (username) DO NOTHING;