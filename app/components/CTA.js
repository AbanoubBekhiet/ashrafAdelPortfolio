"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA({ variant = "home" }) {
	const sectionRef = useRef(null);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const content = section.querySelector(".cta-content");
		if (!content) return;

		gsap.fromTo(
			content,
			{ scale: 0.9, opacity: 0, y: 40 },
			{
				scale: 1,
				opacity: 1,
				y: 0,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 85%",
					end: "top 45%",
					scrub: 1,
				},
			},
		);
	}, []);

	if (variant === "home") {
		return (
			<section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
				<div className="cta-content bg-teal-700 rounded-xl p-8 sm:p-12 md:p-16 lg:p-24 text-center text-white">
					<h2
						className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-5"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						Have a complex dataset?
					</h2>
					<p className="text-sm sm:text-base md:text-lg text-teal-50 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
						Let&apos;s find the narrative hidden in your numbers. Now accepting
						projects for Q4 2024.
					</p>
					<button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-teal-700 font-semibold rounded hover:bg-gray-100 transition cursor-pointer hover:scale-105 transform duration-200 text-sm sm:text-base">
						Schedule a Consultation
					</button>
				</div>
			</section>
		);
	}

	if (variant === "project") {
		return (
			<section
				ref={sectionRef}
				className="bg-gradient-to-r from-teal-100 to-green-100 py-12 sm:py-20 my-8 sm:my-12"
			>
				<div className="cta-content max-w-7xl mx-auto px-4 sm:px-6 text-center">
					<h2
						className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4 sm:mb-6"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						Ready for the Full Technical Audit?
					</h2>
					<p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
						Access comprehensive technical documentation, interactive
						dashboards, and detailed methodology reports.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
						<button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-teal-700 text-white rounded font-medium hover:bg-teal-800 transition cursor-pointer text-sm sm:text-base">
							Download Full Report (2.4 MB)
						</button>
						<button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-teal-700 text-teal-700 rounded font-medium hover:bg-teal-50 transition cursor-pointer text-sm sm:text-base">
							Contact Lead Scientist
						</button>
					</div>
				</div>
			</section>
		);
	}

	return null;
}
