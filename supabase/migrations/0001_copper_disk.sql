/*
  # Quiz Database Schema

  1. New Tables
    - `quizzes`: Stores quiz metadata (name, code)
    - `questions`: Stores questions for each quiz
    - `options`: Stores answer options for each question

  2. Structure
    - Each quiz has multiple questions
    - Each question has multiple options
    - Questions can be single or multiple choice
    - Options track correct answers

  3. Indexes
    - Added indexes for foreign keys and common queries
*/

-- Create quiz table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  text text NOT NULL,
  type text CHECK (type IN ('single', 'multiple')) NOT NULL,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create options table
CREATE TABLE IF NOT EXISTS options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  text text NOT NULL,
  is_correct boolean NOT NULL DEFAULT false,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_code ON quizzes(code);

-- Enable RLS but allow all operations since we don't have auth
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE options ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations
CREATE POLICY "Allow all operations on quizzes" ON quizzes FOR ALL USING (true);
CREATE POLICY "Allow all operations on questions" ON questions FOR ALL USING (true);
CREATE POLICY "Allow all operations on options" ON options FOR ALL USING (true);