"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Toolkit() {
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const cardsRef = useRef(null);

	const items = [
		{
			title: "Python",
			description:
				"Advanced automation, predictive modeling, and ETL pipelines using Pandas, NumPy, and Scikit-Learn.",
			accent: "bg-emerald-50 text-emerald-900",
			icon: "🐍",
		},
		{
			title: "SQL",
			description:
				"Efficient querying and architectural design for relational databases.",
			accent: "bg-amber-50 text-amber-900",
			icon: "🗃️",
		},
		{
			title: "Tableau",
			description: "Dynamic storytelling through interactive dashboards.",
			accent: "bg-slate-50 text-slate-900",
			icon: "📊",
		},
		{
			title: "Power BI",
			description:
				"Enterprise-level data modeling and business intelligence visualization for strategic decision making.",
			accent: "bg-slate-100 text-slate-900",
			icon: "📈",
		},
		{
			title: "Data Storytelling",
			description:
				"Translating numbers into actionable narratives that stakeholders love.",
			accent: "bg-emerald-950 text-white",
			dark: true,
			icon: "📖",
		},
	];

	useEffect(() => {
		const title = titleRef.current;
		const cards = cardsRef.current;
		if (!title || !cards) return;

		gsap.fromTo(
			title.children,
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				stagger: 0.1,
				ease: "none",
				scrollTrigger: {
					trigger: title,
					start: "top 90%",
					end: "top 60%",
					scrub: 1,
				},
			},
		);

		gsap.fromTo(
			cards.children,
			{ y: 50, opacity: 0, scale: 0.92 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
				stagger: 0.08,
				ease: "none",
				scrollTrigger: {
					trigger: cards,
					start: "top 90%",
					end: "top 50%",
					scrub: 1,
				},
			},
		);
	}, []);

	return (
		<section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
			<div ref={titleRef} className="text-center mb-8 sm:mb-12">
				<p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-500 mb-3">
					The Toolkit
				</p>
				<p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
					Specialized in turning raw datasets into growth stories.
				</p>
			</div>

			<div ref={cardsRef} className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				{items.map((item) => (
					<div
						key={item.title}
						className={`rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 md:p-8 min-h-[160px] sm:min-h-[220px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg ${item.dark ? "bg-slate-900" : "bg-white"}`}
					>
						<div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{item.icon}</div>
						<div
							className={`inline-flex rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold ${item.accent}`}
						>
							{item.title}
						</div>
						<p
							className={`mt-3 sm:mt-6 text-xs sm:text-sm leading-5 sm:leading-7 ${item.dark ? "text-slate-100" : "text-slate-700"}`}
						>
							{item.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
