"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
	const footerRef = useRef(null);

	useEffect(() => {
		const footer = footerRef.current;
		if (!footer) return;

		gsap.fromTo(
			footer,
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				ease: "none",
				scrollTrigger: {
					trigger: footer,
					start: "top 98%",
					end: "top 80%",
					scrub: 1,
				},
			},
		);
	}, []);

	return (
		<footer
			ref={footerRef}
			className="border-t border-slate-200 bg-[#f7f3eb] py-8 sm:py-12"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-slate-600">
				<p className="text-xs sm:text-sm mb-3 sm:mb-4">
					Ashraf Adel Portfolio. 
				</p>
				<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
					<a
						href="#"
						className="hover:text-slate-900 transition hover:-translate-y-0.5 inline-block"
					>
						LinkedIn
					</a>
					<a
						href="#"
						className="hover:text-slate-900 transition hover:-translate-y-0.5 inline-block"
					>
						GitHub
					</a>
					<a
						href="#"
						className="hover:text-slate-900 transition hover:-translate-y-0.5 inline-block"
					>
						Tableau Public
					</a>
					<a
						href="#"
						className="hover:text-slate-900 transition hover:-translate-y-0.5 inline-block"
					>
						Medium
					</a>
				</div>
			</div>
		</footer>
	);
}
