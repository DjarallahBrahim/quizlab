/*
  # Add quiz answers tables
  
  1. New Tables
    - `quiz_attempts`: Tracks each attempt at a quiz by a player
      - `id` (uuid, primary key)
      - `quiz_id` (uuid, references quizzes)
      - `player_name` (text)
      - `score` (numeric)
      - `created_at` (timestamp)
    
    - `quiz_answers`: Stores individual answers for each question
      - `id` (uuid, primary key)
      - `attempt_id` (uuid, references quiz_attempts)
      - `question_id` (uuid, references questions)
      - `selected_options` (jsonb, array of selected option IDs)
      - `is_correct` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (since we don't have auth)
*/

-- Create quiz attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  player_name text NOT NULL,
  score numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create quiz answers table
CREATE TABLE IF NOT EXISTS quiz_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  selected_options jsonb NOT NULL,
  is_correct boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_answers_attempt_id ON quiz_answers(attempt_id);

-- Enable RLS
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow all operations on quiz_attempts" ON quiz_attempts FOR ALL USING (true);
CREATE POLICY "Allow all operations on quiz_answers" ON quiz_answers FOR ALL USING (true);