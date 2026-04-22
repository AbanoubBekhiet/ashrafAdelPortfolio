# Terra Analytics - Portfolio Website

A modern, responsive portfolio website built with **Next.js 16**, **Tailwind CSS**, and **Supabase**, showcasing data analysis and visualization projects.

## 🎨 Design Inspiration

This project implements the "Terra Analytics" design concept with:
- **Home Page**: Featured projects, hero section, stats, and CTA
- **Project Details**: Full project information with analysis deep-dive
- **Navigation**: Smooth navigation between listings and details
- **Responsive**: Mobile-first design, fully responsive across devices
- **Dark Mode**: Full dark mode support out of the box

## ✨ Features

- 🎯 **Project Showcase**: Display projects as beautiful cards with images and descriptions
- 🔗 **Dynamic Routing**: Click any project card → detailed project page
- 🗄️ **Supabase Integration**: Real-time data from your Supabase database
- 🎨 **Tailwind CSS**: Fully styled with Tailwind (emerald green theme, easily customizable)
- 📱 **Responsive Design**: Beautiful on mobile, tablet, and desktop
- 🌙 **Dark Mode**: Automatic dark mode support
- ⚡ **Performance**: Next.js optimizations, fast loading
- 🔄 **Real-time Updates**: Data syncs automatically from Supabase

## 📦 What's Included

```
├── 📄 SETUP.md                    # Detailed setup instructions
├── 📄 QUICKSTART.md              # 5-minute quick start
├── 📄 DATABASE.sql               # SQL queries for database setup
├── 📂 app/
│   ├── page.js                   # Home page with featured projects
│   ├── layout.js                 # Root layout
│   ├── globals.css               # Tailwind CSS config
│   └── 📂 projects/
│       └── [id]/
│           └── page.js           # Project detail page
├── 📂 lib/
│   └── supabase.js              # Supabase client
├── .env.local                    # Your credentials (create this)
└── package.json
```

## 🚀 Quick Start (5 minutes)

### 1️⃣ Set Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2️⃣ Create Database Table
Run this SQL in Supabase dashboard:
```sql
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Completed',
  client TEXT,
  timeline TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  narrative TEXT,
  goals TEXT,
  analysis_deep_dive TEXT,
  analysis_image_url TEXT,
  key_findings JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  data_processed TEXT,
  time_investment TEXT
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
```

### 3️⃣ Add Sample Data
See `DATABASE.sql` for complete sample data with all fields.

### 4️⃣ Start Dev Server
```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

## 📚 Full Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](SETUP.md)** - Complete setup guide
- **[DATABASE.sql](DATABASE.sql)** - Database schema and sample data

## 🎯 How It Works

### Home Page Flow
1. Component mounts → Fetches projects from Supabase
2. Projects displayed as interactive cards
3. User clicks a card → Navigates to `/projects/[id]`

### Project Details Page Flow
1. URL contains project ID
2. Page fetches that specific project from Supabase
3. Displays full project details + related projects
4. User can click related projects to view them

### Database Structure
```
projects table:
├── System Fields (id, created_at)
├── Content Fields (title, description, narrative, goals, etc.)
├── Media Fields (image_url, analysis_image_url)
├── Metadata Fields (status, client, timeline)
└── Array Fields (tags, key_findings, deliverables as JSON)
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with routing & SSR |
| **React 19** | UI components & hooks |
| **Tailwind CSS 4** | Styling & responsive design |
| **Supabase** | PostgreSQL database & real-time APIs |
| **Node.js** | Runtime environment |

## 🎨 Customization

### Change Colors
Replace `emerald-` with your color (e.g., `blue-`, `purple-`):
```js
// In page.js and projects/[id]/page.js
className='bg-emerald-600'  // Change emerald to your color
```

### Update Branding
Edit `app/layout.js`:
```js
export const metadata = {
  title: "Your Site Title",
  description: "Your description",
};
```

### Customize Fields
Add more fields to your Supabase table and update the components to display them.

## 📖 Database Fields Reference

| Field | Type | Example | Usage |
|-------|------|---------|-------|
| `title` | TEXT | "Project Name" | Card title |
| `description` | TEXT | "Short description" | Card summary |
| `image_url` | TEXT | "https://..." | Card image |
| `status` | TEXT | "Completed" | Status badge |
| `client` | TEXT | "Company Name" | Project info |
| `timeline` | TEXT | "6 Months" | Duration |
| `tags` | JSONB | `["PYTHON", "SQL"]` | Technology tags |
| `narrative` | TEXT | "Long story..." | Full description |
| `goals` | TEXT | "Project objectives..." | Goals section |
| `analysis_deep_dive` | TEXT | "Detailed analysis..." | Analysis section |
| `key_findings` | JSONB | `["Finding 1", ...]` | Findings grid |
| `deliverables` | JSONB | `["Report", ...]` | Deliverables list |

## 🚨 Troubleshooting

### No projects displaying?
1. Check `.env.local` has correct credentials
2. Verify table exists in Supabase
3. Confirm data is inserted into the table
4. Check browser console (F12) for errors

### Build errors?
- Restart dev server after changing `.env.local`
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`

### Styling issues?
- Clear browser cache (Ctrl+Shift+Delete)
- Check Tailwind CSS imports in `globals.css`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

Using Tailwind's `md:` prefix for tablet & up.

## 🔐 Security

- Row Level Security (RLS) enabled on Supabase table
- Public read access only (no sensitive data)
- Anon key used for frontend (safe to expose)
- No authentication required for reading projects

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect GitHub repo to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically

### Other Hosting
```bash
npm run build  # Create production build
npm start      # Start server
```

Remember to set environment variables in your hosting provider!

## 📊 Performance

- ⚡ Next.js optimizations (13KB gzipped)
- 🖼️ Image optimization ready
- 📦 Code splitting per route
- 🎯 Tailwind CSS purging unused styles
- 🔄 Real-time updates from Supabase

## 🎓 Learning Resources

- **Supabase**: https://supabase.com/docs
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev

## 📝 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📧 Support

For issues or questions:
1. Check the documentation files
2. Review the code comments
3. Check Supabase & Next.js docs

---

**Built with ❤️ using modern web technologies**

Happy building! 🚀
