"use client";

export default function ProjectOverview({ project }) {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
			<div>
				<h2
					className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6 sm:mb-12"
					style={{ fontFamily: "var(--font-playfair)" }}
				>
					Project Overview
				</h2>
				<div className="grid lg:grid-cols-2 gap-8 sm:gap-16">
					<div>
						<p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8 whitespace-pre-wrap break-words" style={{ overflowWrap: "anywhere" }}>
							{project.description ||
								"A portfolio project showcasing technical skills and creative solutions."}
						</p>
						{project.github && (
							<div className="mb-6 sm:mb-8">
								<p className="text-xs sm:text-sm text-gray-600 mb-2 uppercase tracking-wide font-semibold">
									GitHub Repository:
								</p>
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-teal-600 hover:text-teal-800 transition underline break-words text-sm sm:text-base font-medium block"
									style={{ overflowWrap: "anywhere" }}
								>
									{project.github}
								</a>
							</div>
						)}
					</div>
					<div>
						{project.tags && (
							<div className="mb-8 sm:mb-10">
								<p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 uppercase tracking-wide font-semibold">
									Technologies & Skills:
								</p>
								<div className="flex flex-wrap gap-2 sm:gap-3">
									{(() => {
										let tags = [];
										if (Array.isArray(project.tags)) tags = project.tags;
										else if (typeof project.tags === "string") {
											try { tags = JSON.parse(project.tags); } 
											catch { tags = []; }
										}
										return tags.map((tag, idx) => (
											<span
												key={idx}
												className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-50 border border-teal-100 text-teal-800 text-xs sm:text-sm font-medium rounded-full"
											>
												{tag}
											</span>
										));
									})()}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
