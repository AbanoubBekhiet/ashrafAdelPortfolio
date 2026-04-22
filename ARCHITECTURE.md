# 🏗️ Architecture & Data Flow

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Next.js Application (React)              │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                       │  │
│  │  Home Page (/page.js)                               │  │
│  │  ├─ Hero Section                                    │  │
│  │  ├─ Featured Projects Grid                          │  │
│  │  │  └─ Fetches from Supabase on load               │  │
│  │  ├─ Stats Section                                   │  │
│  │  └─ CTA & Footer                                    │  │
│  │                                                       │  │
│  │  Project Detail Page (/projects/[id]/page.js)      │  │
│  │  ├─ Fetches specific project by ID                 │  │
│  │  ├─ Full project information                        │  │
│  │  ├─ Related projects                                │  │
│  │  └─ Back navigation to home                         │  │
│  │                                                       │  │
│  │  Styling                                             │  │
│  │  ├─ globals.css (Tailwind setup)                    │  │
│  │  ├─ Emerald/Slate color scheme                      │  │
│  │  └─ Dark mode support                               │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ▲                                 │
│                            │ HTTP Requests                   │
│                            │ (fetch/supabase JS Client)      │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        Supabase Client (lib/supabase.js)           │  │
│  │        ├─ API Authentication                        │  │
│  │        └─ Real-time data sync                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │ HTTPS
                             │ (Encrypted)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  Supabase Cloud (Backend)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PostgreSQL Database                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  projects Table                                      │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Columns:                                            │  │
│  │  ├─ id (UUID)                                        │  │
│  │  ├─ title, description, narrative                    │  │
│  │  ├─ image_url, analysis_image_url                    │  │
│  │  ├─ status, client, timeline                         │  │
│  │  ├─ tags, key_findings, deliverables (JSON)          │  │
│  │  └─ ... (15 fields total)                             │  │
│  │                                                       │  │
│  │  Sample Data (3 projects included):                  │  │
│  │  ├─ Amazonia Reforestation Impact                    │  │
│  │  ├─ Ecosystem Vitality Index                         │  │
│  │  └─ Sustainable Logistics Network                    │  │
│  │                                                       │  │
│  │  Row Level Security (RLS):                           │  │
│  │  └─ Public read access enabled                       │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Authentication                                             │
│  └─ Anon Key (read-only access)                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## User Interaction Flow

### 1️⃣ **User Visits Home Page**
```
User opens site (http://localhost:3000)
     ↓
Next.js loads app/page.js (Home component)
     ↓
useEffect hook triggers on component mount
     ↓
fetchProjects() runs
     ↓
Supabase client connects with credentials from .env.local
     ↓
Query: SELECT * FROM projects LIMIT 3
     ↓
Supabase returns 3 projects
     ↓
setProjects() updates React state
     ↓
Component re-renders with project cards
     ↓
User sees: Hero, Stats, 3 Project Cards, CTA, Footer
```

### 2️⃣ **User Clicks on Project Card**
```
User clicks on project card
     ↓
onClick handler triggers Next.js navigation
     ↓
Router pushes: /projects/{projectId}
     ↓
Browser URL changes to /projects/abc-123-def
     ↓
Next.js loads app/projects/[id]/page.js
     ↓
[id] dynamic segment extracts: projectId = "abc-123-def"
     ↓
useEffect triggers with projectId dependency
     ↓
fetchProject() runs:
   - Query: SELECT * FROM projects WHERE id = projectId
   - Related query: SELECT * FROM projects LIMIT 3 (excluding current)
     ↓
Supabase returns project data
     ↓
Component renders full project details
     ↓
User sees: Project hero, content, sidebar, related projects
```

### 3️⃣ **User Navigates Through Details**
```
User on project detail page
     ↓
Reads: Narrative, Goals, Analysis, Key Findings, Metadata
     ↓
Can scroll to see Related Projects at bottom
     ↓
User clicks on a related project
     ↓
Same flow as step 2️⃣ happens again (with new projectId)
     ↓
OR user clicks "Back" button
     ↓
Router navigates back to home page (/)
     ↓
Home page data is already cached
     ↓
Instant load of home page
```

---

## Data Model

### projects Table Structure
```
┌─────────────────────────────────────────────────────────────┐
│                       projects                              │
├─────────────────────────────────────────────────────────────┤
│ Column                    Type        Purpose               │
├─────────────────────────────────────────────────────────────┤
│ id                        UUID        Primary key           │
│ created_at                TIMESTAMP   When created          │
│ updated_at                TIMESTAMP   When last updated     │
├─────────────────────────────────────────────────────────────┤
│ title                     TEXT        Project name          │
│ description               TEXT        Card preview text     │
│ narrative                 TEXT        Full story            │
│ goals                     TEXT        Objectives            │
│ analysis_deep_dive        TEXT        Detailed analysis     │
├─────────────────────────────────────────────────────────────┤
│ image_url                 TEXT        Card image            │
│ analysis_image_url        TEXT        Detail page image     │
├─────────────────────────────────────────────────────────────┤
│ status                    TEXT        Completed/In Progress │
│ client                    TEXT        Client name           │
│ timeline                  TEXT        Duration (e.g., 6mo)  │
│ data_processed            TEXT        Data volume           │
│ time_investment           TEXT        Hours spent           │
├─────────────────────────────────────────────────────────────┤
│ tags                      JSONB       ["PYTHON", "SQL"]     │
│ key_findings              JSONB       ["Finding 1", ...]    │
│ deliverables              JSONB       ["Report", ...]       │
└─────────────────────────────────────────────────────────────┘
```

**Example Row:**
```javascript
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-04-19T10:00:00Z",
  "title": "Amazonia Reforestation Impact",
  "description": "Analyzing the environmental impact...",
  "status": "Completed",
  "client": "GreenLife Co",
  "tags": ["PYTHON", "SATELLITE DATA", "GEOSPATIAL"],
  "image_url": "https://example.com/image.jpg",
  ...
}
```

---

## Component Hierarchy

```
<RootLayout>          # app/layout.js
  ├─ Metadata
  ├─ Dark mode setup
  └─ {children}
      │
      ├─ <HomePage>  # app/page.js
      │  ├─ Navigation bar
      │  ├─ Hero section
      │  ├─ Stats grid
      │  ├─ Featured Projects
      │  │  └─ ProjectCard x3
      │  │     └─ Link to /projects/:id
      │  ├─ CTA section
      │  └─ Footer
      │
      └─ <ProjectDetailPage>  # app/projects/[id]/page.js
         ├─ Navigation (with back button)
         ├─ Hero section
         ├─ Main content
         │  ├─ Narrative section
         │  ├─ Analysis deep dive
         │  └─ Key findings grid
         ├─ Sidebar
         │  ├─ Project info
         │  └─ Metrics
         ├─ Related projects
         │  └─ ProjectCard x3
         │     └─ Link to other /projects/:id
         └─ Footer
```

---

## Environment & Configuration

### .env.local (Local Development)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### Runtime Flow
```
.env.local exists?
  ├─ YES → Supabase client initializes
  │        → Can fetch projects data
  │        → Pages render with data
  │
  └─ NO → Supabase remains null
           → Warning in console
           → Pages show "No projects found"
           → User sees friendly message
```

---

## Request/Response Cycle

### Request: Get Featured Projects (Home Page)
```
Client Request
────────────────────────────────────────────────────────────
GET /projects?select=*&limit=3
Host: xxxxx.supabase.co
Authorization: Bearer {ANON_KEY}
Content-Type: application/json

Response
────────────────────────────────────────────────────────────
[
  {
    "id": "...",
    "title": "Project 1",
    "description": "...",
    "image_url": "...",
    ...
  },
  {
    "id": "...",
    "title": "Project 2",
    ...
  },
  ...
]
Status: 200 OK
```

### Request: Get Single Project (Detail Page)
```
Client Request
────────────────────────────────────────────────────────────
GET /projects?id=eq.{projectId}&select=*
Host: xxxxx.supabase.co
Authorization: Bearer {ANON_KEY}
Content-Type: application/json

Response
────────────────────────────────────────────────────────────
{
  "id": "550e8400-....",
  "title": "Amazonia Reforestation Impact",
  "description": "...",
  "narrative": "...",
  "goals": "...",
  "analysis_deep_dive": "...",
  "image_url": "...",
  "status": "Completed",
  "tags": ["PYTHON", "SATELLITE DATA"],
  ...
}
Status: 200 OK
```

---

## Technology Stack Connection

```
┌────────────────────────────────────────────────────┐
│            Frontend Stack                          │
├────────────────────────────────────────────────────┤
│  React 19          - Component framework           │
│  Next.js 16        - Routing & SSR                │
│  Tailwind CSS 4    - Styling                      │
│  JavaScript (ES6+) - Language                     │
└────────────────────────────────────────────────────┘
         ↓ JSON/REST API
┌────────────────────────────────────────────────────┐
│            Backend Stack                           │
├────────────────────────────────────────────────────┤
│  Supabase          - PostgreSQL + API             │
│  PostgreSQL 14+    - Database                     │
│  Node.js APIs      - REST endpoints               │
│  RLS Policies      - Security                     │
└────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

### Local Development
```
Your Computer
└─ npm run dev
   └─ Next.js dev server (http://localhost:3000)
      └─ File watching, hot reload
         └─ Connected to .env.local Supabase project
```

### Production (Vercel/Netlify)
```
Hosting Provider
└─ Built Next.js app (.next folder)
   └─ Running node server (npm start)
      └─ Environment variables set in provider dashboard
         └─ Connected to production Supabase project
```

---

## Performance Characteristics

```
Home Page Load
├─ UI renders instantly (Next.js)
├─ Tailwind CSS loads (4-8KB gzipped)
├─ Supabase client loads (15KB gzipped)
├─ Projects query executes (< 100ms)
├─ Data transforms and renders (< 50ms)
└─ Total: ~500-1000ms from click to fully interactive

Project Detail Load
├─ Same as above, but:
├─ Specific project query (< 100ms)
├─ Related projects query (< 100ms)
├─ More content to render (< 200ms)
└─ Total: ~600-1200ms

---

## Security Model

```
Public (No Auth Needed)
├─ Anyone can read public projects
├─ No sensitive data in database
├─ Supabase RLS policy: "Allow public read"
└─ Safe for frontend apps

Protected (Optional)
├─ Add authentication for admin panel
├─ Create INSERT/UPDATE policies
├─ Use service role key for backend
└─ Require JWT token header
```

---

## Scaling & Future Enhancements

```
Current Setup (Small)
└─ 1 table (projects)
   └─ Fits any portfolio size
   └─ ~1MB of data = free tier

Future Additions
├─ Blog/Articles table
├─ Contact form responses
├─ User comments/reviews
├─ Newsletter subscriptions
├─ File storage (images)
└─ Activity logging

Growth Path
└─ Add authentication
   ├─ Admin dashboard
   ├─ Content management
   └─ User analytics
```

---

## Summary

This architecture ensures:
- ✅ **Fast**: Direct database queries, efficient components
- ✅ **Scalable**: Can handle thousands of projects
- ✅ **Secure**: RLS policies, no sensitive data exposed
- ✅ **Maintainable**: Clear separation of concerns
- ✅ **User-Friendly**: Smooth navigation, responsive design
- ✅ **Developer-Friendly**: Well-documented, easy to modify

**The entire system works together to create a seamless portfolio experience!** 🎉
