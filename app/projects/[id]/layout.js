import { supabase } from "@/lib/supabase";

export async function generateMetadata({ params }) {
  // Await params if Next.js 15+ dynamic route behavior is active
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  if (!supabase) {
    return { title: "Project | Ashraf Adel" };
  }

  const { data: project } = await supabase
    .from("projects")
    .select("title, description, project_images(image_url, image_order)")
    .eq("id", id)
    .single();

  if (!project) {
    return {
      title: "Project Not Found | Ashraf Adel",
    };
  }

  let imageUrl = null;
  const mainImage = project.project_images?.sort((a, b) => a.image_order - b.image_order)[0];
  if (mainImage?.image_url) {
    imageUrl = mainImage.image_url;
    if (!imageUrl.startsWith("http")) {
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-images/${imageUrl}`;
    }
  }

  const title = `${project.title} | Ashraf Adel`;
  const description = project.description || "Data analysis and visualization case study by Ashraf Adel.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default function ProjectDetailLayout({ children }) {
  return children;
}
