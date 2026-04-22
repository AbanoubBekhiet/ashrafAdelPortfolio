# Quick Start Guide - Terra Analytics Portfolio

## 🚀 5-Minute Setup

### Step 1: Get Supabase Credentials (2 min)

1. Go to [supabase.com](https://supabase.com) and sign in to your "ashrafadelportfolio" project
2. Click **Settings** → **API** in the left sidebar
3. Copy these two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon Key** (a long string starting with `eyJ...`)

### Step 2: Configure Environment Variables (1 min)

1. Open `.env.local` file in the root of your project (or create it if it doesn't exist)
2. Paste this content with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 3: Create Database Table (1 min)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

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

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
```

4. Click **Run**

### Step 4: Add Sample Data (Consider optional)

Click **New Query** again and paste:

```sql
INSERT INTO projects (title, description, status, client, timeline, tags, image_url) VALUES
(
  'Amazonia Reforestation Impact',
  'Analyzing the environmental impact of reforestation efforts across 45,000 hectares.',
  'Completed',
  'GreenLife Co',
  '8 Months',
  '["PYTHON", "SATELLITE DATA", "GEOSPATIAL"]',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
),
(
  'Ecosystem Vitality Index',
  'Comprehensive analysis of ecosystem health using machine learning.',
  'Completed',
  'Conservation International',
  '6 Months',
  '["PYTHON", "MACHINE LEARNING"]',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
),
(
  'Sustainable Logistics Node',
  'Optimizing carbon footprints for organic food distribution.',
  'Completed',
  'EcoGrid Ltd',
  '5 Months',
  '["TABLEAU", "SQL"]',
  'https://images.unsplash.com/photo-1578052534191-d41b2e81fa7f?w=800&h=600&fit=crop'
);
```

4. Click **Run**

### Step 5: Start Your App (1 min)

```bash
npm run dev
```

Your app is now running at **http://localhost:3000**! 🎉

---

## ✨ What You Get

### Home Page (`/`)
- Beautiful hero section
- Featured project cards from Supabase
- Click any card → goes to project details page
- Stats showcase
- Call-to-action section

### Project Details Page (`/projects/[id]`)
- Full project information
- Analysis visualizations
- Key findings
- Related projects
- Project metadata sidebar

### Features Included
✅ Tailwind CSS styling (fully responsive)
✅ Dark mode support
✅ Smooth animations & transitions
✅ Real-time data from Supabase
✅ Dynamic routing with Next.js
✅ Clean, professional design

---

## 📝 Database Fields Explained

When adding projects to Supabase, here's what each field does:

| Field | Purpose | Example |
|-------|---------|---------|
| `title` | Project name | "Amazonia Reforestation Impact" |
| `description` | Short description (shown on cards) | "Analyzing environmental impact..." |
| `narrative` | Long detailed story | Full project narrative text |
| `status` | Project status | "Completed", "In Progress" |
| `client` | Client name | "GreenLife Co" |
| `timeline` | Duration | "8 Months" |
| `tags` | JSON array of skills | `["PYTHON", "SATELLITE DATA"]` |
| `image_url` | Card image URL | Any image URL |
| `analysis_image_url` | Detailed analysis image | Any image URL |
| `key_findings` | JSON array of findings | `["Finding 1", "Finding 2"]` |
| `deliverables` | JSON array of deliverables | `["Report", "Dashboard"]` |

---

## 🎨 Customize Colors

To change the color scheme (currently emerald green):

1. Open `app/page.js` and `app/projects/[id]/page.js`
2. Find and replace:
   - `emerald-` → your color (e.g., `blue-`, `purple-`, `red-`)
   - All Tailwind color classes work!

**Examples:**
- Blue: `blue-600`, `blue-700`, `blue-50`
- Purple: `purple-600`, `purple-700`
- Red: `red-600`, `red-700`

---

## 🔗 Project Structure

```
project-root/
├── app/
│   ├── page.js                 ← Home page
│   ├── layout.js               ← Root layout
│   ├── globals.css             ← Tailwind setup
│   └── projects/
│       └── [id]/
│           └── page.js         ← Project detail page
├── lib/
│   └── supabase.js            ← Supabase client
├── .env.local                  ← Your credentials (create this)
├── package.json
└── SETUP.md                    ← Full setup guide
```

---

## 🚨 Troubleshooting

### "No projects showing on home page"
- Check `.env.local` has correct credentials
- Verify table exists in Supabase
- Add sample data to your projects table
- Check browser console for errors (F12)

### "Images not loading"
- Make sure image URLs are publicly accessible
- You can upload images to Supabase Storage and use public URLs

### "Env variables not working"
- Restart your dev server after editing `.env.local`
- Use `npm run dev` to restart

---

## 📚 Next Steps

1. **Customize content** - Edit hero text and descriptions
2. **Add your projects** - Insert more projects into Supabase
3. **Upload images** - Use real project images instead of placeholders
4. **Deploy** - Push to Vercel, Netlify, or your hosting

---

## 🎯 Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 💡 Pro Tips

- **Images**: Use real images for better visual appeal
- **JSON Data**: Use proper JSON format for tags, findings, deliverables
- **SEO**: Update metadata in `app/layout.js`
- **Navigation**: Links in the navbar can be customized in `page.js`

---

## 🆘 Need Help?

- Check `SETUP.md` for detailed setup instructions
- Review Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

---

**Made with ❤️ — Happy building! 🚀**
