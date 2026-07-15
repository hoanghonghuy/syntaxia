-- Track taxonomy for Category → Level → Track IA
ALTER TABLE tracks
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'sql',
  ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'basic';

UPDATE tracks SET category = 'sql', level = 'basic' WHERE id = 'sql-fundamentals';
UPDATE tracks SET category = 'sql', level = 'intermediate' WHERE id = 'postgresql';
