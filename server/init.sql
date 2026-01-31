CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS problems (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  titleslug VARCHAR(255) UNIQUE,
  difficulty VARCHAR(50),
  description TEXT,
  leetcode_id INTEGER,
  link TEXT,
  topics TEXT,
  acceptance_rate DECIMAL(5,2),
  premium_only BOOLEAN DEFAULT FALSE,
  category VARCHAR(50),
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  example_test_cases TEXT,
  similar_questions JSONB
);

INSERT INTO problems (title, titleslug, difficulty, description) VALUES
('Two Sum', 'two-sum', 'Easy', 'Given an array of integers...'),
('Add Two Numbers', 'add-two-numbers', 'Medium', 'You are given two non-empty linked lists...'),
('Median of Two Sorted Arrays', 'median-of-two-sorted-arrays', 'Hard', 'Given two sorted arrays...')
ON CONFLICT (titleslug) DO NOTHING;
