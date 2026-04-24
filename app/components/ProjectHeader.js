"use client";

export default function ProjectHeader({ project, projectImages }) {
	return (
		<section className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
				<div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-12">
					{/* Title and Description */}
					<div className="flex-1 w-full">
						<div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
							{project.categories?.name ? (
								<span className="rounded-full bg-emerald-100 flex-shrink-0 px-3 py-1 text-xs sm:text-sm font-semibold text-emerald-900">
									{project.categories.name}
								</span>
							) : null}
						</div>
						<h1
							className="text-3xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-4 sm:mb-6 break-words"
							style={{ fontFamily: "var(--font-playfair)", overflowWrap: "anywhere", wordBreak: "break-word" }}
						>
							{project.title}
						</h1>
						<p className="text-gray-600 text-base sm:text-lg lg:text-xl break-words" style={{ overflowWrap: "anywhere" }}>
							{project.description ||
								"A comprehensive analysis project demonstrating data-driven insights and impact."}
						</p>
					</div>

					{/* Key Performance Metrics */}
					<div className="bg-gray-50 flex-shrink-0 rounded-[1.5rem] p-6 sm:p-8 min-w-full lg:min-w-[320px] border border-gray-200">
						<h3 className="font-semibold text-gray-900 mb-6 text-xs sm:text-sm uppercase tracking-wider">
							Project Details
						</h3>
						<div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:space-y-6 lg:gap-0">
							<div>
								<p className="text-xs text-gray-600 mb-1">Visibility</p>
								<p className="text-lg sm:text-2xl font-bold text-teal-600 capitalize">
									{project.visibility || "Public"}
								</p>
								<p className="text-[10px] sm:text-xs text-gray-500">project status</p>
							</div>
							<div className="lg:border-t lg:border-gray-200 lg:pt-4">
								<p className="text-xs text-gray-600 mb-1">Tags</p>
								<p className="text-lg sm:text-2xl font-bold text-teal-600">
									{(() => {
										let tags = [];
										if (project.tags) {
											if (Array.isArray(project.tags)) tags = project.tags;
											else if (typeof project.tags === "string") {
												try { tags = JSON.parse(project.tags); } 
												catch { tags = []; }
											}
										}
										return tags.length;
									})()}
								</p>
								<p className="text-[10px] sm:text-xs text-gray-500">categories</p>
							</div>
							<div className="border-t border-gray-200 pt-4">
								<p className="text-xs text-gray-600 mb-1">Technology</p>
								<p className="text-lg sm:text-2xl font-bold text-teal-600 truncate">
									{project.categories?.name || "General"}
								</p>
								<p className="text-[10px] sm:text-xs text-gray-500">primary focus</p>
							</div>
							<div className="border-t border-gray-200 pt-4">
								<p className="text-xs text-gray-600 mb-1">Images</p>
								<p className="text-lg sm:text-2xl font-bold text-teal-600">
									{projectImages?.length || 0}
								</p>
								<p className="text-[10px] sm:text-xs text-gray-500">visual assets</p>
							</div>
							{project.github && (
								<div className="border-t border-gray-200 pt-4">
									<p className="text-xs text-gray-600 mb-1">Source Code</p>
									<a 
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-gray-900 hover:text-teal-600 transition"
									>
										<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
										</svg>
										<span>GitHub</span>
									</a>
									<p className="text-[10px] sm:text-xs text-gray-500">repository</p>
								</div>
							)}
							{project.live_link && (
								<div className="border-t border-gray-200 pt-4">
									<p className="text-xs text-gray-600 mb-1">Live</p>
									<a 
										href={project.live_link}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-emerald-700 hover:text-emerald-900 transition"
									>
										<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
										</svg>
										<span>View</span>
									</a>
									<p className="text-[10px] sm:text-xs text-gray-500">external</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
