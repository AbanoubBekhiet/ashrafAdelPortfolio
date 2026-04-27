"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { supabase } from "@/lib/supabase";
import GSAPProvider from "@/app/components/GSAPProvider";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Toolkit from "@/app/components/Toolkit";
import RootsGrowth from "@/app/components/RootsGrowth";
import FeaturedProjects from "@/app/components/FeaturedProjects";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	// Handle hash scroll (e.g. from /projects -> /#contact-section)
	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			// Wait for DOM to render, then scroll
			const timeout = setTimeout(() => {
				const el = document.querySelector(hash);
				if (el) {
					gsap.to(window, {
						duration: 1,
						scrollTo: { y: hash, offsetY: 80 },
						ease: "power3.inOut",
					});
				}
			}, 500);
			return () => clearTimeout(timeout);
		}
	}, []);

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
				.neq("visibility", "private")
				.order("created_at", { ascending: false })
				.limit(12);

			if (error) throw error;

			const processedProjects = (data || []).map((project) => {
				// Prioritize main_image_url column from the projects table
				let imageUrl = project.main_image_url;

				// Fallback to first image from project_images table if main_image_url is null
				if (!imageUrl && project.project_images?.length > 0) {
					const firstGalleryImage = [...project.project_images].sort(
						(a, b) => a.image_order - b.image_order,
					)[0];
					imageUrl = firstGalleryImage.image_url;
				}

				// Construct final URL if it's a relative storage path
				if (imageUrl && !imageUrl.startsWith("http")) {
					const bucket = "portfolio-assets";
					imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${imageUrl}`;
				}

				return {
					...project,
					image_url: imageUrl,
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
		<GSAPProvider>
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
		</GSAPProvider>
	);
}
