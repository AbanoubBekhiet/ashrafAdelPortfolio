"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const PAGE_SIZE = 10;

export default function ProjectsPage() {
	const [projects, setProjects] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [page, setPage] = useState(1);
	const [totalProjects, setTotalProjects] = useState(0);
	const [loading, setLoading] = useState(true);

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
					.select("*, categories(name), project_images(image_url, image_order)", { count: "exact" });

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

	return (
		<div className="min-h-screen bg-[#f7f3eb]">
			<header className="border-b border-slate-200 bg-[#f7f3eb] sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
					<Link href="/" className="text-2xl font-semibold text-slate-900">
						TerraData
					</Link>
					<nav className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
						<Link href="/" className="hover:text-slate-900">
							Home
						</Link>
						<Link href="/projects" className="text-slate-900 font-semibold">
							Projects
						</Link>
						<a href="#" className="hover:text-slate-900">
							Resume
						</a>
						<a href="#" className="hover:text-slate-900">
							About
						</a>
					</nav>
					<button className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 transition">
						Contact Me
					</button>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-6 py-16">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-sm text-emerald-900 font-medium mb-8"
				>
					← Back to Home
				</Link>

				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
					<div>
						<p className="text-xs uppercase tracking-[0.35em] text-emerald-900 font-semibold mb-3">
							Project Gallery
						</p>
						<h1 className="text-5xl font-semibold text-slate-900 leading-tight max-w-2xl">
							Explore projects by technology category.
						</h1>
						<p className="text-slate-600 mt-4 max-w-xl">
							Filter by category and browse paged project results from the Supabase database.
						</p>
					</div>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
						<div className="rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
							<label htmlFor="category" className="sr-only">
								Choose category
							</label>
							<select
								id="category"
								value={selectedCategory}
								onChange={(e) => {
									setSelectedCategory(e.target.value);
									setPage(1);
								}}
								className="rounded-full bg-white px-4 py-2 text-sm text-slate-900 outline-none"
							>
								<option value="all">All technologies</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
							<span className="font-semibold text-slate-900">
								{totalProjects}
							</span>
							<span className="ml-2">projects found</span>
						</div>
					</div>
				</div>

				<div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{loading
						? [...Array(PAGE_SIZE)].map((_, index) => (
							<div
								key={index}
								className="h-40 sm:h-48 md:h-56 lg:h-64 rounded-[2rem] bg-slate-100 animate-pulse"
							/>
						))
						: projects.length > 0
						? projects.map((project) => (
							<Link key={project.id} href={`/projects/${project.id}`}>
								<div className="group rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-[0_25px_80px_-50px_rgba(15,23,42,0.2)] transition hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
									<div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-slate-900">
										{project.image_url ? (
											<img
												src={project.image_url}
												alt={project.title}
												className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
											/>
										) : (
											<div className="flex h-full items-center justify-center bg-slate-800 text-slate-200">
												No preview available
											</div>
										)}
									</div>
									<div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col flex-grow">
										<div className="mb-3 sm:mb-4 flex flex-wrap gap-2 text-xs sm:text-sm">
											{project.categories?.name ? (
												<span className="rounded-full bg-emerald-100 px-2 sm:px-3 py-1 font-semibold text-emerald-900">
													{project.categories.name}
												</span>
											) : null}
										</div>
										<h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 line-clamp-2">
											{project.title}
										</h2>
										<p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6 leading-6 line-clamp-2 sm:line-clamp-3">
											{project.description ||
												"Interactive dashboard design and analytics for modern enterprise clients."}
										</p>
										<div className="mt-auto flex flex-wrap gap-2 items-center justify-between text-xs sm:text-sm text-slate-500">
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
															className="rounded-full bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1"
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
							<div className="col-span-3 rounded-[2rem] border border-slate-200 bg-slate-50 p-12 text-center text-slate-700">
								No projects matched that category.
							</div>
						)}
				</div>

				<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-sm text-slate-600">
						Showing {projects.length} of {totalProjects} projects
					</p>
					<div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
						<button
							onClick={() => setPage((current) => Math.max(1, current - 1))}
							disabled={page === 1}
							className="rounded-full px-4 py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
						>
							Previous
						</button>
						<span className="px-4 py-2 font-semibold text-slate-900">
							Page {page} of {pageCount}
						</span>
						<button
							onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
							disabled={page === pageCount}
							className="rounded-full px-4 py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
