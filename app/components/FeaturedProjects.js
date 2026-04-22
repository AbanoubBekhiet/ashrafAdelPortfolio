import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function FeaturedProjects({ projects, loading }) {
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [filteredProjects, setFilteredProjects] = useState([]);

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
		if (selectedCategory === "all") {
			setFilteredProjects(projects);
		} else {
			setFilteredProjects(
				projects.filter((project) => project.category_id === selectedCategory),
			);
		}
	}, [selectedCategory, projects]);

	return (
		<section className="max-w-7xl mx-auto px-6">
			<div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm uppercase tracking-[0.35em] text-emerald-900 mb-2">
						Featured Projects
					</p>
					<h2 className="text-4xl font-semibold text-slate-900">
						Deep dives into data discovery.
					</h2>
				</div>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
					<div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
						<label htmlFor="category" className="sr-only">
							Choose category
						</label>
						<select
							id="category"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
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
					<div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
						<span className="font-semibold text-slate-900">
							{filteredProjects.length}
						</span>
						<span className="ml-2">projects found</span>
					</div>
				</div>
			</div>

			<div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 mb-24">
				{loading ? (
					[1, 2].map((item) => (
						<div
							key={item}
							className="h-64 sm:h-80 md:h-96 rounded-[2rem] bg-slate-100 animate-pulse"
						/>
					))
				) : filteredProjects.length > 0 ? (
					filteredProjects.slice(0, 6).map((project) => (
						<Link key={project.id} href={`/projects/${project.id}`}>
								<div className="group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_80px_-50px_rgba(15,23,42,0.2)] transition hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
									<div className="relative h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden bg-slate-900">
									{project.main_image_url ? (
										<img
											src={project.main_image_url}
											alt={project.title}
											className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
										/>
									) : (
										<div className="flex h-full items-center justify-center bg-slate-800 text-slate-200">
											No image available
										</div>
									)}
								</div>
								<div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
									<div className="mb-3 sm:mb-4 flex flex-wrap gap-2 text-xs sm:text-sm">
										{project.category?.name ? (
											<span className="rounded-full bg-emerald-100 px-2 sm:px-3 py-1 font-semibold text-emerald-900">
												{project.categories.name}
											</span>
										) : null}
									</div>
									<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3 md:mb-4 line-clamp-2">
										{project.title}
									</h3>
									<p className="text-xs sm:text-sm text-slate-600 leading-6 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
										{project.description ||
											"An analytical showcase of data visualization strategy and dashboard storytelling."}
									</p>
									<div className="mt-auto flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500">
										{project.tags &&
											(Array.isArray(project.tags)
												? project.tags
												: typeof project.tags === "string"
													? JSON.parse(project.tags)
													: []
												).slice(0, 3).map((tag, idx) => (
													<span
														key={idx}
														className="rounded-full bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1"
													>
														{tag}
													</span>
												))}
											<span className="ml-auto text-emerald-900 font-semibold text-xs sm:text-sm whitespace-nowrap">
												View →
										</span>
									</div>
								</div>
							</div>
						</Link>
					))
				) : (
					<div className="col-span-2 rounded-[2rem] border border-slate-200 bg-slate-50 p-12 text-center text-slate-600">
						No projects found for the selected category.
					</div>
				)}
			</div>
		</section>
	);
}
