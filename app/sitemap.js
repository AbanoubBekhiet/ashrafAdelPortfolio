import { supabase } from "@/lib/supabase";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ashrafadel.com'; // Adjust to your real domain

  // Core static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  if (supabase) {
    try {
      const { data: projects, error } = await supabase
        .from("projects")
        .select("id, updated_at, created_at")
        .neq("visibility", "private");
      
      if (!error && projects) {
        const projectRoutes = projects.map((project) => ({
          url: `${baseUrl}/projects/${project.id}`,
          lastModified: new Date(project.updated_at || project.created_at || new Date()),
          changeFrequency: 'weekly',
          priority: 0.6,
        }));
        
        routes.push(...projectRoutes);
      }
    } catch (error) {
      console.error("Error generating sitemap for projects:", error);
    }
  }

  return routes;
}
