export default function ProjectOverview({ project }) {
	return (
		<section className="max-w-7xl mx-auto px-6 py-16">
			<div>
				<h2
					className="text-4xl font-light text-gray-900 mb-8"
					style={{ fontFamily: "var(--font-playfair)" }}
				>
					Project Overview
				</h2>
				<div className="grid lg:grid-cols-2 gap-12">
					<div>
						<p className="text-gray-700 leading-relaxed mb-6">
							{project.description ||
								"A portfolio project showcasing technical skills and creative solutions."}
						</p>
						{project.github && (
							<div className="mb-6">
								<p className="text-sm text-gray-600 mb-2">
									<strong>GitHub Repository:</strong>
								</p>
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-teal-600 hover:text-teal-800 underline"
								>
									{project.github}
								</a>
							</div>
						)}
					</div>
					<div>
						{project.tags && project.tags.length > 0 && (
							<div className="mb-6">
								<p className="text-sm text-gray-600 mb-3">
									<strong>Technologies & Skills:</strong>
								</p>
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag, idx) => (
										<span
											key={idx}
											className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						)}
						<p className="text-gray-700 leading-relaxed">
							This project demonstrates expertise in modern web development,
							user experience design, and technical problem-solving.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
