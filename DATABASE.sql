-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.project_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  image_url text NOT NULL,
  explanation text NOT NULL,
  image_order integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT project_images_pkey PRIMARY KEY (id),
  CONSTRAINT project_images_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  description text,
  main_image_url text,
  tags ARRAY DEFAULT '{}'::text[],
  slug text UNIQUE,
  github text,
  visibility text DEFAULT 'public'::text CHECK (visibility = ANY (ARRAY['public'::text, 'private'::text])),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);

-- Enable RLS on categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert/update" ON categories
  FOR INSERT WITH CHECK (true)
  USING (true);

CREATE POLICY "Allow authenticated update" ON categories
  FOR UPDATE USING (true);

-- Sample categories
INSERT INTO categories (name, slug) VALUES
  ('Web Development', 'web-development'),
  ('Mobile Apps', 'mobile-apps'),
  ('Data Science', 'data-science'),
  ('Machine Learning', 'machine-learning'),
  ('DevOps', 'devops');

-- Sample projects
INSERT INTO projects (title, description, main_image_url, tags, slug, github, visibility, category_id) VALUES
  ('E-Commerce Platform', 'A full-stack e-commerce solution built with Next.js and Supabase', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', ARRAY['nextjs', 'supabase', 'react'], 'e-commerce-platform', 'https://github.com/example/ecommerce', 'public', (SELECT id FROM categories WHERE slug = 'web-development')),
  ('Mobile Fitness App', 'Cross-platform fitness tracking app with React Native', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', ARRAY['react-native', 'firebase', 'mobile'], 'mobile-fitness-app', 'https://github.com/example/fitness', 'public', (SELECT id FROM categories WHERE slug = 'mobile-apps')),
  ('Data Analytics Dashboard', 'Real-time data visualization dashboard for business intelligence', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', ARRAY['python', 'pandas', 'plotly'], 'data-analytics-dashboard', 'https://github.com/example/analytics', 'public', (SELECT id FROM categories WHERE slug = 'data-science')),
  ('ML Image Classifier', 'Computer vision model for image classification using TensorFlow', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', ARRAY['tensorflow', 'python', 'ml'], 'ml-image-classifier', 'https://github.com/example/ml-classifier', 'public', (SELECT id FROM categories WHERE slug = 'machine-learning')),
  ('CI/CD Pipeline', 'Automated deployment pipeline with Docker and Kubernetes', 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800', ARRAY['docker', 'kubernetes', 'jenkins'], 'ci-cd-pipeline', 'https://github.com/example/cicd', 'public', (SELECT id FROM categories WHERE slug = 'devops'));

-- Sample project images
INSERT INTO project_images (project_id, image_url, explanation, image_order) VALUES
  ((SELECT id FROM projects WHERE slug = 'e-commerce-platform'), 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 'Main dashboard view', 1),
  ((SELECT id FROM projects WHERE slug = 'e-commerce-platform'), 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', 'Product catalog', 2),
  ((SELECT id FROM projects WHERE slug = 'mobile-fitness-app'), 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', 'App interface', 1),
  ((SELECT id FROM projects WHERE slug = 'data-analytics-dashboard'), 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'Dashboard overview', 1),
  ((SELECT id FROM projects WHERE slug = 'ml-image-classifier'), 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', 'Model architecture', 1);
