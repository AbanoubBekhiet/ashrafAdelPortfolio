export default function ProjectHeader({ project, projectImages }) {
	return (
		<section className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-6 py-12">
				<div className="flex flex-col lg:flex-row justify-between items-start gap-8">
					{/* Title and Description */}
					<div className="flex-1">
						<div className="flex flex-wrap gap-3 mb-6">
							{project.category?.name ? (
								<span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-900">
									{project.category.name}
								</span>
							) : null}
						</div>
						<h1
							className="text-5xl font-light text-gray-900 mb-3"
							style={{ fontFamily: "var(--font-playfair)" }}
						>
							{project.title}
						</h1>
						<p className="text-gray-600 text-lg">
							{project.description ||
								"A comprehensive analysis project demonstrating data-driven insights and impact."}
						</p>
					</div>

					{/* Key Performance Metrics */}
					<div className="bg-gray-50 rounded-lg p-8 min-w-fit border border-gray-200 w-full lg:w-auto">
						<h3 className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wider">
							Project Details
						</h3>
						<div className="space-y-4">
							<div>
								<p className="text-xs text-gray-600 mb-1">Visibility</p>
								<p className="text-2xl font-bold text-teal-600 capitalize">
									{project.visibility || "Public"}
								</p>
								<p className="text-xs text-gray-500">project status</p>
							</div>
							<div className="border-t border-gray-200 pt-4">
								<p className="text-xs text-gray-600 mb-1">Tags</p>
								<p className="text-2xl font-bold text-teal-600">
									{project.tags?.length || 0}
								</p>
								<p className="text-xs text-gray-500">categories</p>
						</div>
						<div className="border-t border-gray-200 pt-4">
							<p className="text-xs text-gray-600 mb-1">Technology</p>
							<p className="text-2xl font-bold text-teal-600">
								{project.category?.name || "General"}
							</p>
							<p className="text-xs text-gray-500">primary focus</p>
						</div>
						<div className="border-t border-gray-200 pt-4">
								<p className="text-xs text-gray-600 mb-1">Images</p>
								<p className="text-2xl font-bold text-teal-600">
									{projectImages?.length || 0}
								</p>
								<p className="text-xs text-gray-500">visual assets</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
