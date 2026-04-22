# Terra Analytics - Setup Guide

This project implements a portfolio website with a home page featuring projects and individual project detail pages, all connected to Supabase.

## Project Structure

```
app/
├── layout.js                 # Root layout with metadata
├── page.js                   # Home page with featured projects
├── globals.css              # Tailwind CSS setup
└── projects/
    └── [id]/
        └── page.js          # Dynamic project detail page
lib/
└── supabase.js             # Supabase client configuration
.env.local.example          # Environment variables template
```

## Setup Instructions

### 1. Supabase Project Setup

First, you need to have a Supabase project ready. If you already have your "ashrafadelportfolio" project, connect it using the steps below.

#### Create the Projects Table

In your Supabase dashboard, go to the SQL Editor and run this query to create the projects table:

```sql
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  title TEXT NOT NULL,
  description TEXT,
  narrative TEXT,
  goals TEXT,
  analysis_deep_dive TEXT,
  image_url TEXT,
  analysis_image_url TEXT,
  status TEXT DEFAULT 'Completed',
  client TEXT,
  timeline TEXT,
  data_processed TEXT,
  time_investment TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  key_findings JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb
);

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read" ON projects
  FOR SELECT USING (true);
```

### 2. Environment Variables

1. Copy the `.env.local.example` file to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get your Supabase credentials from [supabase.com](https://supabase.com):
   - Go to your project dashboard
   - Click "Settings" → "API"
   - Copy your **Project URL** and **Anon Key**

3. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Add Sample Data

In your Supabase SQL Editor, insert sample projects:

```sql
INSERT INTO projects (title, description, narrative, goals, status, client, timeline, tags, image_url, analysis_image_url, key_findings, deliverables) VALUES
(
  'Amazonia Reforestation Impact',
  'Analyzing the environmental impact of reforestation efforts across 45,000 hectares of previously degraded land in the Brazil.',
  'The Amazon reforestation project serves as a comprehensive multi-spectral analysis of forest restoration efforts. Our analysis integrated satellite imagery, climate data, and biodiversity metrics to quantify the ecological impact.',
  'To assess and quantify the relationship between reforestation efforts and ecosystem recovery metrics. Our objective was to verify the cascade of benefits across soil quality, biodiversity, and carbon sequestration.',
  'Completed',
  'GreenLife Co',
  '8 Months',
  '["PYTHON", "SATELLITE DATA", "GEOSPATIAL"]',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551986782-d244a8f44ccf?w=900&h=500&fit=crop',
  '["Identified significant biomass accumulation across 89% of reforested areas", "Soil quality metrics improved by 156% over 24-month period", "Detected presence of previously unrecorded species in monitoring zones"]',
  '["Comprehensive restoration assessment report", "Interactive biodiversity tracking dashboard", "Satellite-based monitoring system"]'
),
(
  'Ecosystem Vitality Index',
  'A comprehensive Python-based analysis of ecosystem health across the Amazon basin using machine learning and multi-source data integration.',
  'Through satellite remote sensing, historical environmental interventions and climate data we quantified biodiversity patterns across diverse biomes.',
  'Develop a predictive model for ecosystem health and identify intervention points for conservation efforts through advanced statistical analysis.',
  'Completed',
  'Conservation International',
  '6 Months',
  '["PYTHON", "MACHINE LEARNING", "GEOSPATIAL"]',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  null,
  '[]',
  '["Ecosystem health scoring model", "Conservation priority mapping", "Impact prediction system"]'
),
(
  'Sustainable Logistics Node',
  'Optimizing carbon footprints for organic food distribution through Tableau-powered route analytics and real-time supply chain visibility.',
  'Carbon logistics optimization represents a critical frontier in sustainable food systems. This analysis leveraged supply chain data and carbon accounting frameworks to design efficient distribution networks.',
  'Create a scalable logistics optimization model that reduces transportation emissions while maintaining delivery efficiency and client satisfaction.',
  'Completed',
  'EcoGrid Ltd',
  '5 Months',
  '["TABLEAU", "SQL", "LOGISTICS"]',
  'https://images.unsplash.com/photo-1578052534191-d41b2e81fa7f?w=800&h=600&fit=crop',
  null,
  '[]',
  '["Carbon footprint analysis", "Route optimization algorithm", "Real-time monitoring dashboard"]'
);
```

### 4. Data Schema Reference

**Projects Table Columns:**

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Unique identifier |
| created_at | TIMESTAMP | Creation timestamp |
| title | TEXT | Project title |
| description | TEXT | Short description (shown in cards) |
| narrative | TEXT | Detailed project narrative |
| goals | TEXT | Project goals and objectives |
| analysis_deep_dive | TEXT | Detailed analysis description |
| status | TEXT | Project status (e.g., "Completed", "In Progress") |
| client | TEXT | Client/organization name |
| timeline | TEXT | Project timeline (e.g., "6 Months") |
| data_processed | TEXT | Volume of data processed (e.g., "1.2B") |
| time_investment | TEXT | Hours invested (e.g., "850h") |
| image_url | TEXT | Project card image URL |
| analysis_image_url | TEXT | Analysis visualization image URL |
| tags | JSONB | Array of technology tags as JSON |
| key_findings | JSONB | Array of key findings as JSON |
| deliverables | JSONB | Array of deliverables as JSON |

### 5. Running the Application

```bash
# Install dependencies (already done)
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your portfolio site!

## Features Implemented

✅ **Home Page**
- Navigation bar with site branding
- Hero section with headline and CTAs
- Stats showcase (datasets, reports, accuracy)
- Featured projects grid (3 projects fetched from Supabase)
- Call-to-action section
- Footer with links

✅ **Project Detail Page**
- Dynamic routing with project ID (`/projects/[id]`)
- Project hero section with title and tags
- Detailed project narrative and goals
- Analysis deep dive section
- Key findings displayed in a grid
- Sidebar with project metadata and metrics
- Related projects section (3 random projects)
- Loading states and error handling

✅ **Design**
- Tailwind CSS for all styling
- Emerald green and slate color scheme
- Dark mode support
- Responsive design (mobile, tablet, desktop)
- Smooth hover effects and transitions
- Loading animations

✅ **Supabase Integration**
- Real-time data fetching from projects table
- Client-side data queries with error handling
- Support for complex JSON data (tags, findings, deliverables)
- Row-level security enabled

## Customization

### Change Colors
Edit the color classes in the pages:
- Replace `emerald-*` with your preferred color (e.g., `blue-*`, `purple-*`)
- Replace `slate-*` with your preferred neutral tone

### Update Site Metadata
Edit `app/layout.js`:
```javascript
export const metadata = {
  title: "Your Site Title",
  description: "Your site description",
};
```

### Add More Fields
If you want to add more fields to projects:
1. Update the SQL table schema
2. Update the page components to display new fields
3. Populate the new fields with data

## Troubleshooting

### "Missing Supabase environment variables"
- Verify `.env.local` exists and contains both required variables
- Restart the dev server after adding environment variables

### No projects showing
- Check that your Supabase table has data
- Verify RLS policies allow public read access
- Check browser console for error messages

### Images not loading
- Ensure image URLs are publicly accessible
- You can upload images to Supabase Storage and use the public URLs

## Next Steps

1. **Connect Supabase**: Add your project credentials to `.env.local`
2. **Create table & add data**: Use the SQL provided above
3. **Run the dev server**: `npm run dev`
4. **Customize**: Update colors, content, and design to match your brand
5. **Deploy**: Deploy to Vercel, Netlify, or your hosting provider

## Deployment

The site is easy to deploy:

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
- Connect your GitHub repo to Netlify
- Set environment variables in Netlify dashboard
- Deploy automatically on push

Make sure to set your environment variables in your hosting provider's dashboard!
