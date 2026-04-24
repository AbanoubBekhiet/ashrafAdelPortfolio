"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Header from "@/app/components/Header";
import ProjectHeader from "@/app/components/ProjectHeader";
import ProjectOverview from "@/app/components/ProjectOverview";
import AnalysisDeepDive from "@/app/components/AnalysisDeepDive";
import CTA from "@/app/components/CTA";
import RelatedProjects from "@/app/components/RelatedProjects";
import Footer from "@/app/components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
	const params = useParams();
	const projectId = params.id;

	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [relatedProjects, setRelatedProjects] = useState([]);
	const [projectImages, setProjectImages] = useState([]);
	const containerRef = useRef(null);

	async function fetchProject() {
		try {
			setLoading(true);

			if (!supabase) {
				console.error(
					"Supabase not configured. Please set environment variables in .env.local",
				);
				return;
			}

			// Fetch the current project
			const { data: projectData, error: projectError } = await supabase
				.from("projects")
				.select("*, categories(name)")
				.eq("id", projectId)
				.single();

			if (projectError) throw projectError;
			setProject(projectData);

			// Fetch related projects (limit to 3, exclude current)
			if (projectData) {
				const { data: relatedData } = await supabase
					.from("projects")
					.select("*, categories(name)")
					.neq("id", projectId)
					.neq("visibility", "private")
					.limit(3);

				setRelatedProjects(relatedData || []);

				// Fetch project images
				const { data: imagesData, error: imagesError } = await supabase
					.from("project_images")
					.select("*")
					.eq("project_id", projectId)
					.order("image_order", { ascending: true });

				if (imagesError) {
					console.error("Error fetching images:", imagesError);
					setProjectImages([]);
				} else {
					// Process images to ensure proper URLs
					const processedImages = (imagesData || []).map((img) => {
						// If image_url doesn't start with http, assume it's a storage path
						if (img.image_url && !img.image_url.startsWith("http")) {
							const bucket = "project-images"; // Default bucket name
							const storageUrl = `${
								process.env.NEXT_PUBLIC_SUPABASE_URL
							}/storage/v1/object/public/${bucket}/${img.image_url}`;
							return { ...img, image_url: storageUrl };
						}
						return img;
					});
					setProjectImages(processedImages);
				}
			}
		} catch (error) {
			console.error("Error fetching project:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchProject();
	}, [projectId]);

	useGSAP(() => {
		if (project && !loading) {
			const tl = gsap.timeline();

			tl.from(".gsap-fade-in", {
				opacity: 0,
				y: 40,
				duration: 0.8,
				stagger: 0.2,
				ease: "power3.out",
				clearProps: "all"
			});

			gsap.utils.toArray(".gsap-scroll-trigger").forEach((el) => {
				gsap.from(el, {
					scrollTrigger: {
						trigger: el,
						start: "top 85%",
					},
					opacity: 0,
					y: 50,
					duration: 0.8,
					ease: "power3.out",
				});
			});
		}
	}, { dependencies: [project, loading], scope: containerRef });

	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<div className="inline-block mb-4">
						<div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
					</div>
					<p className="text-gray-600">Loading project...</p>
				</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="min-h-screen bg-white flex flex-col items-center justify-center">
				<h1
					className="text-2xl font-light text-gray-900 mb-4"
					style={{ fontFamily: "var(--font-playfair)" }}
				>
					Project not found
				</h1>
				<Link
					href="/"
					className="px-6 py-2 bg-teal-700 text-white font-medium rounded hover:bg-teal-800 transition"
				>
					Back to Home
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50" ref={containerRef}>
			<Header variant="project" />
			<div className="gsap-fade-in">
				<ProjectHeader project={project} projectImages={projectImages} />
			</div>
			<div className="gsap-scroll-trigger">
				<ProjectOverview project={project} />
			</div>
			<div className="gsap-scroll-trigger">
				<AnalysisDeepDive project={project} projectImages={projectImages} />
			</div>
			<div className="gsap-scroll-trigger">
				<RelatedProjects relatedProjects={relatedProjects} />
			</div>
			<Footer />
		</div>
	);
}
