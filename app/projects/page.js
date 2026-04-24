"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Header from "@/app/components/Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PAGE_SIZE = 10;

export default function ProjectsPage() {
	const [projects, setProjects] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [page, setPage] = useState(1);
	const [totalProjects, setTotalProjects] = useState(0);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const containerRef = useRef(null);

	useEffect(() => {
		async function fetchCategories() {
			try {
				if (!supabase) return;

				const { data, error } = await supabase
					.from("categories")
					.select("*")
					.order("name", { ascending: true });

				if (error) throw error;
				setCategories(data || []);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		}

		fetchCategories();
	}, []);

	useEffect(() => {
		async function fetchProjects() {
			try {
				if (!supabase) return;

				setLoading(true);
				const from = (page - 1) * PAGE_SIZE;
				const to = from + PAGE_SIZE - 1;

				let query = supabase
					.from("projects")
					.select("*, categories(name), project_images(image_url, image_order)", { count: "exact" })
					.neq("visibility", "private");

				if (selectedCategory !== "all") {
					query = query.eq("category_id", selectedCategory);
				}

				const { data, error, count } = await query
					.order("created_at", { ascending: false })
					.range(from, to);

				if (error) throw error;

				// Process projects to get main image
				const processedProjects = (data || []).map((project) => {
					const mainImage = project.project_images?.sort(
						(a, b) => a.image_order - b.image_order,
					)[0];

					let imageUrl = mainImage?.image_url || project.image_url;
					if (imageUrl && !imageUrl.startsWith("http")) {
						const bucket = "project-images";
						imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${imageUrl}`;
					}

					return {
						...project,
						image_url: imageUrl,
					};
				});

				setProjects(processedProjects);
				setTotalProjects(count ?? data?.length ?? 0);
			} catch (error) {
				console.error("Error fetching projects:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchProjects();
	}, [selectedCategory, page]);

	const pageCount = Math.max(1, Math.ceil(totalProjects / PAGE_SIZE));

	function handleContactClick() {
		router.push("/#contact-section");
	}

	useGSAP(() => {
		gsap.from(".header-content > *", {
			y: 30,
			opacity: 0,
			duration: 0.8,
			stagger: 0.1,
			ease: "power3.out",
			clearProps: "all"
		});
	}, { scope: containerRef });

	useGSAP(() => {
		// Animate the filter buttons when the container has the buttons
		gsap.from(".category-filters button", {
			x: -20,
			opacity: 0,
			duration: 0.5,
			stagger: 0.05,
			ease: "power2.out",
			clearProps: "all"
		});
	}, { dependencies: [categories], scope: containerRef });

	useGSAP(() => {
		if (!loading && projects.length > 0) {
			gsap.from(".project-card", {
				y: 40,
				opacity: 0,
				duration: 0.6,
				stagger: 0.1,
				ease: "power3.out",
				clearProps: "all"
			});
		}
	}, { dependencies: [loading, projects], scope: containerRef });

	return (
		<div className="min-h-screen bg-[#f7f3eb]" ref={containerRef}>
			<Header />

			<main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
				<div className="header-content">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-900 font-medium mb-6 sm:mb-8 hover:underline"
					>
						← Back to Home
					</Link>
				</div>

				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8 sm:mb-12">
					<div className="max-w-2xl header-content">
						<p className="text-xs uppercase tracking-[0.35em] text-emerald-900 font-semibold mb-3">
							Project Gallery
						</p>
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
							Explore projects by technology category.
						</h1>
						<p className="text-slate-600 mt-4 text-sm sm:text-base">
							Browse through {totalProjects} data analysis and visualization projects .
						</p>
					</div>

					<div className="category-filters flex flex-wrap gap-2 sm:gap-3 lg:items-center">
						<button
							onClick={() => {
								setSelectedCategory("all");
								setPage(1);
							}}
							className={`flex items-center text-red-500 gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition shadow-sm border ${
								selectedCategory === "all"
									? "bg-slate-900 text-white border-slate-900 shadow-md"
									: "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
							}`}
						>
							🌐 All Projects
						</button>
						{categories.map((category) => {
							let icon = "📁";
							const name = category.name.toLowerCase();
							if (name.includes("python")) icon = "🐍";
							else if (name.includes("sql")) icon = "🗃️";
							else if (name.includes("tableau")) icon = "📊";
							else if (name.includes("power bi")) icon = "📈";
							else if (name.includes("excel")) icon = "📗";
							else if (name.includes("react") || name.includes("next")) icon = "⚛️";
							
							return (
								<button
									key={category.id}
									onClick={() => {
										setSelectedCategory(category.id);
										setPage(1);
									}}
									className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition shadow-sm border ${
										selectedCategory === category.id
											? "bg-slate-900 text-white border-slate-900 shadow-md"
											: "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
									}`}
								>
									<span>{icon}</span>
									<span>{category.name}</span>
								</button>
							);
						})}
					</div>
				</div>

				<div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{loading
						? [...Array(PAGE_SIZE)].map((_, index) => (
							<div
								key={index}
								className="h-40 sm:h-48 md:h-56 lg:h-64 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-100 animate-pulse"
							/>
						))
						: projects.length > 0
						? projects.map((project) => (
							<Link key={project.id} href={`/projects/${project.id}`} className="project-card">
								<div className="group rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-[0_25px_80px_-50px_rgba(15,23,42,0.2)] transition hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
									<div className="relative h-36 sm:h-44 md:h-56 lg:h-64 overflow-hidden bg-slate-900">
										{project.image_url ? (
											<img
												src={project.image_url}
												alt={project.title}
												className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
											/>
										) : (
											<div className="flex h-full items-center justify-center bg-slate-800 text-slate-200 text-sm">
												No preview available
											</div>
										)}
									</div>
									<div className="p-3 sm:p-5 md:p-6 lg:p-8 flex flex-col flex-grow">
										<div className="mb-2 sm:mb-3 md:mb-4 flex flex-wrap gap-2 text-xs sm:text-sm">
											{project.categories?.name ? (
												<span className="rounded-full bg-emerald-100 px-2 sm:px-3 py-1 font-semibold text-emerald-900">
													{project.categories.name}
												</span>
											) : null}
										</div>
										<h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-900 mb-1.5 sm:mb-2 md:mb-3 line-clamp-2">
											{project.title}
										</h2>
										<p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 md:mb-6 leading-5 sm:leading-6 line-clamp-2 sm:line-clamp-3 break-words"
										   style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
										>
											{project.description ||
												"Interactive dashboard design and analytics for modern enterprise clients."}
										</p>
										<div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2 items-center justify-between text-xs sm:text-sm text-slate-500">
											<div className="flex flex-wrap gap-1 sm:gap-2">
												{(() => {
													let tags = [];
													if (project.tags) {
														if (Array.isArray(project.tags)) {
															tags = project.tags;
														} else if (typeof project.tags === "string") {
															try {
																tags = JSON.parse(project.tags);
															} catch {
																tags = [];
															}
														}
													}
													return tags.slice(0, 3).map((tag, idx) => (
														<span
															key={idx}
															className="rounded-full bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1 text-xs"
														>
															{tag}
														</span>
													));
												})()}
											</div>
											<span className="font-medium text-emerald-900 text-xs sm:text-sm whitespace-nowrap">
												View →
											</span>
										</div>
									</div>
								</div>
							</Link>
						)) : (
							<div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 bg-slate-50 p-8 sm:p-12 text-center text-slate-700 text-sm sm:text-base">
								No projects matched that category.
							</div>
						)}
				</div>

				<div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-xs sm:text-sm text-slate-600">
						Showing {projects.length} of {totalProjects} projects
					</p>
					<div className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-slate-200 bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm shadow-sm flex-wrap">
						<button
							onClick={() => setPage((current) => Math.max(1, current - 1))}
							disabled={page === 1}
							className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
						>
							← Prev
						</button>
						<div className="flex items-center gap-0.5 sm:gap-1">
							{Array.from({ length: pageCount }, (_, i) => i + 1).map(
								(pageNum) => (
									<button
										key={pageNum}
										onClick={() => setPage(pageNum)}
										className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
											pageNum === page
												? "bg-emerald-900 text-white"
												: "text-slate-600 hover:bg-slate-100"
										}`}
									>
										{pageNum}
									</button>
								),
							)}
						</div>
						<button
							onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
							disabled={page === pageCount}
							className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
						>
							Next →
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
