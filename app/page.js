"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Toolkit from "@/app/components/Toolkit";
import RootsGrowth from "@/app/components/RootsGrowth";
import FeaturedProjects from "@/app/components/FeaturedProjects";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";

export default function Home() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchProjects() {
		try {
			if (!supabase) {
				console.error(
					"Supabase not configured. Please set environment variables in .env.local",
				);
				return;
			}

			const { data, error } = await supabase
				.from("projects")
				.select(
					`
          *,
          categories(name),
          project_images!inner (
            image_url,
            image_order
          )
        `,
				)
				.order("created_at", { ascending: false })
				.limit(12);

			if (error) throw error;

			const processedProjects = (data || []).map((project) => {
				const mainImage = project.project_images?.sort(
					(a, b) => a.image_order - b.image_order,
				)[0];

				let mainImageUrl = mainImage?.image_url;
				if (mainImageUrl && !mainImageUrl.startsWith("http")) {
					const bucket = "project-images";
					mainImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${mainImageUrl}`;
				}

				return {
					...project,
					main_image_url: mainImageUrl,
					image_url: mainImageUrl || project.image_url,
				};
			});

			setProjects(processedProjects);
		} catch (error) {
			console.error("Error fetching projects:", error);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		fetchProjects();
	}, []);

	return (
		<div className="min-h-screen bg-[#f7f3eb] text-slate-900">
			<Header variant="home" />
			<main>
				<Hero />
				<Toolkit />
				<RootsGrowth />
				<FeaturedProjects projects={projects} loading={loading} />
				<ContactSection />
			</main>
			<Footer />
		</div>
	);
}
