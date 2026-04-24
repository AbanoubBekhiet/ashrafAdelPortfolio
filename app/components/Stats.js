"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
	const sectionRef = useRef(null);

	const stats = [
		{ value: 120, suffix: "+", label: "Datasets Analyzed" },
		{ value: 1.4, suffix: "k", label: "Reports Created", decimal: true },
		{ value: 98, suffix: "%", label: "Accuracy Rating" },
		{ value: 15, suffix: "", label: "Global Partners" },
	];

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const counters = section.querySelectorAll(".stat-value");

		counters.forEach((counter, index) => {
			const stat = stats[index];
			const target = stat.value;
			const obj = { val: 0 };

			gsap.to(obj, {
				val: target,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 80%",
					end: "top 40%",
					scrub: 1,
				},
				onUpdate: () => {
					if (stat.decimal) {
						counter.textContent = obj.val.toFixed(1) + stat.suffix;
					} else {
						counter.textContent =
							Math.round(obj.val) + stat.suffix;
					}
				},
			});
		});

		const labels = section.querySelectorAll(".stat-label");
		gsap.fromTo(
			labels,
			{ y: 20, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				stagger: 0.08,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 75%",
					end: "top 45%",
					scrub: 1,
				},
			},
		);
	}, []);

	return (
		<section ref={sectionRef} className="border-y border-gray-200 py-12 sm:py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 text-center">
				{stats.map((stat, idx) => (
					<div key={idx}>
						<p
							className="stat-value text-3xl sm:text-4xl md:text-5xl font-light text-gray-900"
							style={{ fontFamily: "var(--font-playfair)" }}
						>
							0
						</p>
						<p className="stat-label text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 mt-2 sm:mt-3">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
