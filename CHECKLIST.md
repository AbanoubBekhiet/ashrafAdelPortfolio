# ✅ Setup Checklist - Terra Analytics

Complete setup in order. Check off each step as you go! ✓

## Phase 1: Prepare Supabase (5 minutes)

- [ ] **1.1** Go to https://supabase.com and sign in
- [ ] **1.2** Open your "ashrafadelportfolio" project
- [ ] **1.3** Click **Settings** → **API** in left sidebar
- [ ] **1.4** Copy **Project URL** and save it temporarily
- [ ] **1.5** Copy **Anon Key** and save it temporarily
- [ ] **1.6** Go to **SQL Editor** section
- [ ] **1.7** Click **New Query**
- [ ] **1.8** Copy the entire SQL from `DATABASE.sql` file
- [ ] **1.9** Paste into SQL Editor
- [ ] **1.10** Click **Run** button (bottom right)
- [ ] **1.11** Wait for "Success" message
- [ ] **1.12** Go to **Table Editor** and verify "projects" table exists
- [ ] **1.13** Click on "projects" table and verify you see 3 sample rows

✅ **Supabase is ready!**

---

## Phase 2: Configure Environment Variables (2 minutes)

- [ ] **2.1** Open your VS Code project folder
- [ ] **2.2** Create file `.env.local` in root directory (same level as package.json)
- [ ] **2.3** Copy this template:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
  ```
- [ ] **2.4** Replace `https://your-project-id...` with your **Project URL** from step 1.4
- [ ] **2.5** Replace `your-anon-key-here` with your **Anon Key** from step 1.5
- [ ] **2.6** **Save** the file (Ctrl+S / Cmd+S)
- [ ] **2.7** Do NOT commit this file to git (it's in .gitignore)

✅ **Environment variables are configured!**

---

## Phase 3: Review Project Files (3 minutes)

- [ ] **3.1** Open `app/page.js` - This is your home page
- [ ] **3.2** Scroll through it and read the code (it's clean and commented)
- [ ] **3.3** Open `app/projects/[id]/page.js` - This is the project detail page
- [ ] **3.4** Notice the dynamic routing with `[id]` - This handles `/projects/:id` URLs
- [ ] **3.5** Open `lib/supabase.js` - This initializes the Supabase client
- [ ] **3.6** Check `.env.local` exists and has your credentials

✅ **Code is in place!**

---

## Phase 4: Start Development Server (1 minute)

- [ ] **4.1** Open terminal in VS Code (Ctrl+` or View → Terminal)
- [ ] **4.2** Make sure you're in project root directory
- [ ] **4.3** Run: `npm run dev`
- [ ] **4.4** Wait for "✔ Ready in XXXX ms"
- [ ] **4.5** Go to http://localhost:3000 in your browser
- [ ] **4.6** You should see the Terra Analytics home page
- [ ] **4.7** You should see 3 project cards displayed

✅ **Your site is live locally!**

---

## Phase 5: Test Functionality (2 minutes)

### Home Page Tests
- [ ] **5.1** Page displays without errors
- [ ] **5.2** Hero section is visible and styled correctly
- [ ] **5.3** Stats section shows numbers (120+, 1.4k, 98%, 15)
- [ ] **5.4** Three project cards are displayed
- [ ] **5.5** Project cards show images, titles, and descriptions
- [ ] **5.6** CTA button section is visible
- [ ] **5.7** Footer is visible at bottom

### Navigation Tests
- [ ] **5.8** Click on a project card
- [ ] **5.9** URL changes to `/projects/[some-uuid]`
- [ ] **5.10** Project detail page loads (give it 1-2 seconds)
- [ ] **5.11** Project title is displayed at top
- [ ] **5.12** Project details are shown (narrative, goals, findings)
- [ ] **5.13** "Back" button appears in navigation
- [ ] **5.14** Click "Back" button
- [ ] **5.15** You return to home page

### Dark Mode Test (Optional)
- [ ] **5.16** Press F12 to open DevTools
- [ ] **5.17** Find the palette icon or appearance settings
- [ ] **5.18** Toggle to dark mode
- [ ] **5.19** Site should have dark colors (slate-950, etc.)

✅ **Everything is working!**

---

## Phase 6: Customize Content (5-10 minutes)

- [ ] **6.1** Open `app/layout.js`
- [ ] **6.2** Update `metadata.title` to your site name
- [ ] **6.3** Update `metadata.description` to your tagline
- [ ] **6.4** Open `app/page.js`
- [ ] **6.5** Update "Terra Analytics" branding to your name/company
- [ ] **6.6** Update hero section text (lines with "Visualizing Insight...")
- [ ] **6.7** Update button text and calls-to-action
- [ ] **6.8** Update footer content
- [ ] **6.9** Save all files and refresh browser to see changes

✅ **Your branding is applied!**

---

## Phase 7: Add Your Projects (10-15 minutes)

### For Each Project:
- [ ] **7.1** Gather project information (title, description, image, etc.)
- [ ] **7.2** Find or create images for the project
- [ ] **7.3** Upload images to a hosting service (Imgur, Supabase Storage, etc.)
- [ ] **7.4** Go to Supabase SQL Editor
- [ ] **7.5** Run INSERT query for your project (see DATABASE.sql for format)
- [ ] **7.6** Refresh home page in browser
- [ ] **7.7** Verify new project card appears
- [ ] **7.8** Click card to verify detail page displays

✅ **Your projects are in the database!**

---

## Phase 8: Final Verification (2 minutes)

- [ ] **8.1** All env variables are set in `.env.local`
- [ ] **8.2** Dev server is running with `npm run dev`
- [ ] **8.3** Home page loads and displays projects
- [ ] **8.4** Clicking a project card navigates to detail page
- [ ] **8.5** Back button works correctly
- [ ] **8.6** No console errors (F12 → Console tab)
- [ ] **8.7** Images are loading correctly
- [ ] **8.8** Styling looks clean and professional
- [ ] **8.9** Mobile view is responsive (F12 → Toggle device toolbar)
- [ ] **8.10** Dark mode works (if you tested it)

✅ **Ready for deployment!**

---

## Phase 9: Deployment (Choose One)

### Option A: Vercel (Recommended) - 5 minutes
- [ ] **9A.1** Go to https://vercel.com and sign up/sign in
- [ ] **9A.2** Click "New Project"
- [ ] **9A.3** Import your GitHub repository
- [ ] **9A.4** In environment variables, add:
  - `NEXT_PUBLIC_SUPABASE_URL=...`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- [ ] **9A.5** Click "Deploy"
- [ ] **9A.6** Wait for deployment to complete
- [ ] **9A.7** Click "Visit" to see your live site
- [ ] **9A.8** Test the live site (click projects, etc.)

### Option B: Netlify - 5 minutes
- [ ] **9B.1** Go to https://netlify.com and sign up/sign in
- [ ] **9B.2** Click "Add new site" → "Import an existing project"
- [ ] **9B.3** Choose your Git provider and repository
- [ ] **9B.4** In Environment section, add same variables as Option A
- [ ] **9B.5** Click "Deploy site"
- [ ] **9B.6** Wait for deployment
- [ ] **9B.7** Test the live site

### Option C: Other Hosting
- [ ] **9C.1** Run `npm run build` in terminal
- [ ] **9C.2** Upload the `.next` folder to your host
- [ ] **9C.3** Set environment variables on your host
- [ ] **9C.4** Start the server with `npm start`

✅ **Your site is live! 🚀**

---

## Optional Enhancements

- [ ] **10.1** Change color scheme (replace `emerald-` with `blue-`, `purple-`, etc.)
- [ ] **10.2** Add more projects to database
- [ ] **10.3** Update hero images and project images
- [ ] **10.4** Add Google Analytics
- [ ] **10.5** Set up custom domain
- [ ] **10.6** Add more pages (about, contact, etc.)
- [ ] **10.7** Implement authentication for admin panel
- [ ] **10.8** Add blog/news section

---

## Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| No projects showing | Check `.env.local` has correct credentials, verify table exists |
| Env variables not working | Restart dev server after editing `.env.local` |
| Images not loading | Use publicly accessible URLs, or upload to Supabase Storage |
| Page crashes on detail | Check project UUID is valid, verify RLS policies |
| Build fails with errors | Clear `.next` folder: `rm -rf .next` |
| Dev server won't start | Delete `node_modules` and `package-lock.json`, run `npm install` |

---

## Success Criteria - You're Done When: ✨

✅ `.env.local` exists with Supabase credentials  
✅ Projects table exists in Supabase with sample data  
✅ Home page displays with featured projects  
✅ Clicking a project card navigates to project detail page  
✅ Project detail page shows full information  
✅ All images load correctly  
✅ Site is responsive on mobile, tablet, and desktop  
✅ No browser console errors  
✅ Site is deployed and accessible via public URL  

---

## Getting Help

1. **Check the docs:**
   - `QUICKSTART.md` - 5-minute quick start
   - `SETUP.md` - Detailed setup guide
   - `README_PROJECT.md` - Full project overview

2. **Common issues:**
   - Check browser console (F12)
   - Check terminal for error messages
   - Review `.env.local` has correct values

3. **External Resources:**
   - Supabase: https://supabase.com/docs
   - Next.js: https://nextjs.org/docs
   - Tailwind CSS: https://tailwindcss.com/docs

---

## 🎉 Congratulations!

You've successfully set up Terra Analytics! Your portfolio site is now:
- ✅ Live and fully functional
- ✅ Connected to Supabase database
- ✅ Displaying your projects beautifully
- ✅ Mobile responsive
- ✅ Ready to impress clients!

**Enjoy your new portfolio website! 🚀**
