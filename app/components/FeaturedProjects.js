"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 4;

export default function FeaturedProjects({ projects = [], loading = false }) {
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const [activeCategory, setActiveCategory] = useState("all");
	const [page, setPage] = useState(1);

	// Get unique categories with icons
	const categoriesWithIcons = [
		{ id: "all", name: "All Projects", icon: "🌐" },
		...Array.from(new Set(projects.map((p) => p.categories?.name).filter(Boolean))).map(
			(name) => {
				let icon = "📁";
				if (name.toLowerCase().includes("python")) icon = "🐍";
				else if (name.toLowerCase().includes("sql")) icon = "🗃️";
				else if (name.toLowerCase().includes("tableau")) icon = "📊";
				else if (name.toLowerCase().includes("power bi")) icon = "📈";
				return { id: name, name, icon };
			},
		),
	];

	// Filter and paginate
	const filteredProjects =
		activeCategory === "all"
			? projects
			: projects.filter((p) => p.categories?.name === activeCategory);

	const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
	const currentStart = (page - 1) * PAGE_SIZE;
	const currentProjects = filteredProjects.slice(currentStart, currentStart + PAGE_SIZE);

	// Switch category safely
	function handleCategoryChange(id) {
		setActiveCategory(id);
		setPage(1);
	}

	// GSAP Animations
	useEffect(() => {
		const section = sectionRef.current;
		const header = headerRef.current;
		if (!section || !header) return;

		gsap.fromTo(
			header.children,
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				stagger: 0.1,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 85%",
					end: "top 55%",
					scrub: 1,
				},
			},
		);

		const cards = section.querySelectorAll(".project-card");
		if (cards.length > 0) {
			gsap.fromTo(
				cards,
				{ y: 50, opacity: 0, scale: 0.95 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					stagger: 0.1,
					ease: "none",
					scrollTrigger: {
						trigger: section,
						start: "top 75%",
						end: "top 35%",
						scrub: 1,
					},
				},
			);
		}
	}, [currentProjects]);

	return (
		<section ref={sectionRef} id="featured-projects" className="py-16 sm:py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8 mb-10 sm:mb-16">
					<div>
						<p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-emerald-900 font-semibold mb-3 sm:mb-4">
							Featured Work
						</p>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">
							Translating complex datasets <br className="hidden sm:block" />
							into actionable business insights.
						</h2>
					</div>

					<div className="flex flex-wrap gap-2 sm:gap-3 self-start md:self-auto">
						{categoriesWithIcons.map((cat) => (
							<button
								key={cat.id}
								onClick={() => handleCategoryChange(cat.id)}
								className={`
									flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition shadow-sm border
									${activeCategory === cat.id 
										? "bg-slate-900 text-white border-slate-900 shadow-md" 
										: "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"}
								`}
							>
								<span>{cat.icon}</span>
								<span>{cat.name}</span>
							</button>
						))}
					</div>
				</div>

				<div className="grid gap-6 sm:gap-8 md:grid-cols-2">
					{loading ? (
						[...Array(4)].map((_, i) => (
							<div key={i} className="h-[400px] rounded-[2rem] bg-slate-200 animate-pulse" />
						))
					) : currentProjects.length > 0 ? (
						currentProjects.map((project) => (
							<Link key={project.id} href={`/projects/${project.id}`}>
								<div className="project-card group rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-[0_25px_80px_-50px_rgba(15,23,42,0.2)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_45px_100px_-50px_rgba(15,23,42,0.3)] cursor-pointer h-full flex flex-col">
									<div className="relative h-48 sm:h-64 overflow-hidden bg-slate-900">
										{project.image_url ? (
											<img
												src={project.image_url}
												alt={project.title}
												className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-90"
											/>
										) : (
											<div className="flex h-full items-center justify-center bg-slate-800 text-slate-400 text-sm font-medium">
												Data Visualization Interface
											</div>
										)}
										<div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
									</div>
									<div className="p-6 sm:p-8 md:p-10 flex flex-col flex-grow">
										<div className="mb-4 sm:mb-6 flex flex-wrap gap-2 text-xs sm:text-sm">
											{project.categories?.name && (
												<span className="rounded-full bg-emerald-50 px-3 sm:px-4 py-1.5 font-semibold text-emerald-900 border border-emerald-100">
													{project.categories.name}
												</span>
											)}
										</div>
										<h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4 line-clamp-2 leading-tight group-hover:text-emerald-900 transition-colors duration-300">
											{project.title}
										</h3>
										<p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 leading-6 sm:leading-7 line-clamp-3 break-words" style={{ overflowWrap: "anywhere" }}>
											{project.description ||
												"Comprehensive data analysis and strategic reporting to drive operational efficiency and growth."}
										</p>
										<div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 sm:pt-6">
											<span className="font-semibold text-emerald-900 text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
												View Project Case Study <span aria-hidden="true">&rarr;</span>
											</span>
										</div>
									</div>
								</div>
							</Link>
						))
					) : (
						<div className="col-span-2 rounded-[2rem] border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-sm">
							No projects found in this category.
						</div>
					)}
				</div>

				<div className="mt-12 sm:mt-16 flex items-center justify-between flex-col sm:flex-row gap-4">
					<p className="text-sm text-slate-500 font-medium tracking-wide">
						Page {page} of {totalPages}
					</p>
					<div className="flex gap-2">
						<button
							onClick={() => setPage(Math.max(1, page - 1))}
							disabled={page === 1}
							className="rounded-full px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
						>
							&larr; Prev
						</button>
						<div className="flex items-center gap-1">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
								<button
									key={p}
									onClick={() => setPage(p)}
									className={`w-10 h-10 rounded-full text-sm font-semibold transition ${
										p === page
											? "bg-emerald-900 text-white"
											: "text-slate-600 hover:bg-slate-100"
									}`}
								>
									{p}
								</button>
							))}
						</div>
						<button
							onClick={() => setPage(Math.min(totalPages, page + 1))}
							disabled={page === totalPages}
							className="rounded-full px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
						>
							Next &rarr;
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
