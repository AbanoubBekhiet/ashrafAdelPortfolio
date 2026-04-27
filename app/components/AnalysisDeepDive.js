"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnalysisDeepDive({ projectImages = [] }) {
	const sectionRef = useRef(null);

	let validImages = [...projectImages].sort((a, b) => a.image_order - b.image_order);
	
	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const blocks = section.querySelectorAll(".analysis-block");
		blocks.forEach((block) => {
			gsap.fromTo(
				block,
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: block,
						start: "top 85%",
						end: "top 55%",
						scrub: 1,
					},
				},
			);
		});
	}, [projectImages]);

	const formatImageUrl = (url) => {
		if (!url) return "";
		if (url.startsWith("http")) return url;
		return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-images/${url}`;
	};

	return (
		<section className="bg-gray-50 py-16 sm:py-24" ref={sectionRef}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<h2
					className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-10 sm:mb-16 text-center"
					style={{ fontFamily: "var(--font-playfair)" }}
				>
					Analysis Deep Dive
				</h2>

				<div className="space-y-16 sm:space-y-24 md:space-y-32">
					{validImages.length > 0 ? (
						validImages.map((img, idx) => {
							return (
								<div
									key={img.id || idx}
									className={`analysis-block flex flex-col gap-8 sm:gap-12 lg:gap-16 ${
										idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
									} items-center`}
								>
									{/* Image side */}
									<div className="flex-1 w-full lg:w-auto">
										<div className="relative w-full aspect-[4/3] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-xl sm:shadow-2xl">
											<img
												src={formatImageUrl(img.image_url)}
												alt={`Analysis Visualization ${idx + 1}`}
												className="absolute inset-0 w-full h-full object-cover"
											/>
										</div>
									</div>

									{/* Content side */}
									<div className="flex-1 w-full">
										<div className="p-6 sm:p-8 lg:p-10 rounded-[1.5rem] sm:rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
											<h3
												className="text-2xl sm:text-3xl font-light text-gray-900 mb-4 sm:mb-6"
												style={{ fontFamily: "var(--font-playfair)", overflowWrap: "anywhere" }}
											>
												Visualization Details
											</h3>
											<p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-medium break-words whitespace-pre-wrap" style={{ overflowWrap: "anywhere" }}>
												{img.explanation || 
													"This visualization provides foundational insights and evidence supporting the core project outcomes."}
											</p>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div className="text-center p-12 bg-white rounded-3xl border border-dashed border-slate-300">
							<p className="text-slate-500">No detailed visualizations available for this project yet.</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
