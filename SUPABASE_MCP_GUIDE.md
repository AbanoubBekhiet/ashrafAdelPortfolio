# 🚀 Supabase MCP Integration Guide

## What is Supabase MCP?

Supabase MCP (Model Context Protocol) tools provide direct database management without needing environment variables or SDK configuration. These are advanced tools that let you:

- ✅ Create and manage tables
- ✅ Execute SQL queries directly
- ✅ Run migrations
- ✅ Manage branches
- ✅ Manage Edge Functions
- ✅ List tables and extensions

## Activated MCP Tools

Your Supabase project (`adelAshrafPortfolio`) has these MCP tools ready:

### **Database Tools**
- `mcp_com_supabase__apply_migration` - Create/modify tables
- `mcp_com_supabase__execute_sql` - Run direct SQL queries

### **Project Management Tools**
- `mcp_com_supabase__get_project` - Get project details
- `mcp_com_supabase__list_projects` - List all your projects
- `mcp_com_supabase__list_migrations` - View all migrations
- `mcp_com_supabase__list_tables` - View all tables
- `mcp_com_supabase__list_extensions` - View extensions

### **Branch Management Tools**
- `mcp_com_supabase__create_branch` - Create dev branches
- `mcp_com_supabase__list_branches` - View all branches
- `mcp_com_supabase__merge_branch` - Merge to production
- `mcp_com_supabase__rebase_branch` - Rebase branches

## Your Project Details

```
Project Name: adelAshrafPortfolio
Project ID: qxpzlrhrxyyfwqldssvk
Region: eu-west-1
Status: ACTIVE_HEALTHY
Database: PostgreSQL 17.6
```

## Setting Up the Database with MCP

### Option 1: Create Projects Table (MCP Method)

The database table will be created using MCP when you're ready. It will include:

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  narrative TEXT,
  goals TEXT,
  analysis_deep_dive TEXT,
  image_url TEXT,
  analysis_image_url TEXT,
  status TEXT,
  client TEXT,
  timeline TEXT,
  data_processed TEXT,
  time_investment TEXT,
  tags JSONB,
  key_findings JSONB,
  deliverables JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Option 2: Manual Setup (Recommended for Now)

1. Get your Supabase credentials:
   - Go to https://supabase.com
   - Open `adelAshrafPortfolio` project
   - Settings → API → Copy Project URL and Anon Key

2. Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://qxpzlrhrxyyfwqldssvk.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
   ```

3. Run SQL in Supabase:
   - Go to SQL Editor
   - Copy code from `DATABASE.sql`
   - Run it

4. Start dev server:
   ```bash
   npm run dev
   ```

## Using MCP Tools Directly

### Check Project Status
```
MCP Tool: mcp_com_supabase__get_project
Project ID: qxpzlrhrxyyfwqldssvk
```

### List All Tables
```
MCP Tool: mcp_com_supabase__list_tables
Project ID: qxpzlrhrxyyfwqldssvk
Schemas: ["public"]
```

### Create Table (Migration)
```
MCP Tool: mcp_com_supabase__apply_migration
Project ID: qxpzlrhrxyyfwqldssvk
Migration Name: create_projects_table
Query: [SQL code from DATABASE.sql]
```

### Insert Data
```
MCP Tool: mcp_com_supabase__execute_sql
Project ID: qxpzlrhrxyyfwqldssvk
Query: INSERT INTO projects (title, description, ...) VALUES (...)
```

## Architecture

```
Your Next.js App
    ↓
.env.local (contains credentials)
    ↓
lib/supabase.js (creates client)
    ↓
Supabase JavaScript SDK
    ↓
Supabase Cloud (PostgreSQL)

OR

Your Next.js App
    ↓
MCP Tools (direct access)
    ↓
Supabase Cloud (PostgreSQL)
```

## Benefits of MCP

1. **No Environment Variables Needed in MCP** - Direct database access
2. **Automated Schema Creation** - Just pass SQL, let MCP handle it
3. **Direct SQL Execution** - Run queries without app code
4. **Easy Data Management** - Insert sample data easily
5. **Backup & Recovery** - Can create branches and reset

## When to Use MCP

### ✅ Use MCP When:
- You want direct database management without the app
- Setting up database during development
- Running one-off SQL queries
- Creating migrations
- Managing branches for testing

### ✅ Use JavaScript SDK When:
- Running the app in production
- Need real-time data updates
- Building user features
- Handling authentication
- Dynamic queries from user input

## Current Setup

Your app uses the **JavaScript SDK** approach:

```javascript
// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

This is the **recommended production approach**.

## Database Schema Ready

The projects table includes all fields for rich project information:

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Unique identifier |
| title | TEXT | Project name |
| description | TEXT | Card preview |
| narrative | TEXT | Full story |
| goals | TEXT | Project objectives |
| analysis_deep_dive | TEXT | Detailed analysis |
| image_url | TEXT | Card image |
| analysis_image_url | TEXT | Detail image |
| status | TEXT | Completed/In Progress |
| client | TEXT | Client name |
| timeline | TEXT | Duration |
| tags | JSONB | Technology array |
| key_findings | JSONB | Findings array |
| deliverables | JSONB | Deliverables array |
| data_processed | TEXT | Data volume |
| time_investment | TEXT | Hours invested |
| created_at | TIMESTAMP | When created |
| updated_at | TIMESTAMP | Last updated |

## Sample Data Included

The DATABASE.sql file includes 3 sample projects:

1. **Amazonia Reforestation Impact**
   - GreenLife Co
   - 8 Months
   - Full details with images

2. **Ecosystem Vitality Index**
   - Conservation International
   - 6 Months
   - Complete project info

3. **Sustainable Logistics Network**
   - EcoGrid Ltd
   - 5 Months
   - Ready to go

## Next Steps

### Immediate (5 minutes)
```bash
1. Create .env.local with your Supabase credentials
2. Run DATABASE.sql in Supabase SQL Editor
3. npm run dev
4. Test at http://localhost:3000
```

### Later (Optional)
```bash
1. Explore MCP tools
2. Create dev branches with MCP
3. Automate migrations with MCP
4. Manage production database with MCP
```

## Troubleshooting

### If MCP tools don't work:
- Verify Supabase project ID is correct
- Check SQL syntax in migrations
- Ensure migrations are applied before executing queries
- Check Supabase project status is ACTIVE_HEALTHY

### If app doesn't connect:
- Verify .env.local has correct URL and key
- Restart dev server after editing .env.local
- Check RLS policies allow public read
- Check browser console for error messages

## Documentation

- **Setup Guide**: See QUICKSTART.md
- **Database Schema**: See DATABASE.sql
- **Design Updates**: See DESIGN_UPDATE.md
- **Architecture**: See ARCHITECTURE.md

## Support

- **Supabase Docs**: https://supabase.com/docs
- **MCP Overview**: https://modelcontextprotocol.io
- **Next.js + Supabase**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

---

**MCP tools are activated and ready to use. Choose your preferred setup method and get started!** 🚀
