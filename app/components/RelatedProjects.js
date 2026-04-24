import Link from "next/link";

export default function RelatedProjects({ relatedProjects }) {
	if (!relatedProjects || relatedProjects.length === 0) return null;

	return (
		<section className="border-t border-gray-200 py-12 sm:py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<h2
					className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-8 sm:mb-16"
					style={{ fontFamily: "var(--font-playfair)" }}
				>
					Related Projects
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
					{relatedProjects.map((relatedProject) => (
						<Link
							key={relatedProject.id}
							href={`/projects/${relatedProject.id}`}
						>
							<div className="group cursor-pointer">
								<div className="relative h-40 sm:h-52 md:h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-3 sm:mb-5 shadow-md hover:shadow-lg transition">
									<div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent" />
									{relatedProject.image_url && (
										<img
											src={relatedProject.image_url}
											alt={relatedProject.title}
											className="w-full h-full object-cover group-hover:scale-105 transition"
										/>
									)}
								</div>
								<h3
									className="text-base sm:text-lg md:text-xl font-light text-gray-900 mb-2 sm:mb-3 group-hover:text-teal-600 transition line-clamp-2"
									style={{ fontFamily: "var(--font-playfair)" }}
								>
									{relatedProject.title}
								</h3>
								<p className="text-gray-600 text-xs sm:text-sm line-clamp-2 break-words"
								   style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
								>
									{relatedProject.description}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
